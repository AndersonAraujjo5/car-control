import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaException');

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const meta = exception.meta || {};
    const field =
      (meta.field_name as string) ||
      exception.message.match(/constraint: `(.+?)`/)?.[1] || // Pega o nome da constraint no texto
      'unknown field';
    const cleanField = field
      .replace(`${meta.modelName}_`, '')
      .replace('_fkey', '');

    // "FuelFull_userId_fkey" vira apenas "userId"
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected database error occurred.';
    const errorCode = exception.code;

    switch (exception.code) {
      // --- 400 BAD REQUEST (Input/Validation Errors) ---
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = `The provided value is too long for the column: ${cleanField}`;
        break;
      case 'P2005':
        status = HttpStatus.BAD_REQUEST;
        message = `The value ${meta.field_value} stored in the database for the field ${cleanField} is invalid for the field type.`;
        break;
      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        message = `The provided value ${meta.field_value} for ${meta.model_name} field ${cleanField} is not valid.`;
        break;
      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = `Null constraint violation on ${meta.constraint}`;
        break;
      case 'P2012':
        status = HttpStatus.BAD_REQUEST;
        message = `Missing a required value at ${meta.path}`;
        break;
      case 'P2013':
        status = HttpStatus.BAD_REQUEST;
        message = `Missing the required argument ${meta.argument_name} for field ${cleanField} on ${meta.object_name}.`;
        break;
      case 'P2019':
        status = HttpStatus.BAD_REQUEST;
        message = `Input error: ${meta.details}`;
        break;
      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        message = `Value out of range for the type: ${meta.details}`;
        break;
      case 'P2029':
        status = HttpStatus.BAD_REQUEST;
        message = `Query parameter limit exceeded: ${meta.message}`;
        break;
      case 'P2033':
        status = HttpStatus.BAD_REQUEST;
        message = `The number used in the query does not fit into a 64-bit signed integer. Consider using BigInt.`;
        break;

      // --- 404 NOT FOUND ---
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = `The record searched for in the where condition (${meta.model_name}.${meta.argument_name} = ${meta.argument_value}) does not exist.`;
        break;
      case 'P2015':
        status = HttpStatus.NOT_FOUND;
        message = `A related record could not be found. ${meta.details}`;
        break;
      case 'P2018':
        status = HttpStatus.NOT_FOUND;
        message = `The required connected records were not found. ${meta.details}`;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = `An operation failed because it depends on one or more records that were required but not found. ${meta.cause}`;
        break;

      // --- 409 CONFLICT (Constraints & Relations) ---
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Unique constraint failed on the fields: ${meta.target}`;
        break;
      case 'P2003':
        status = HttpStatus.CONFLICT;
        message = `Foreign key constraint failed on the field: ${cleanField}`;
        break;
      case 'P2014':
        status = HttpStatus.CONFLICT;
        message = `The change you are trying to make would violate the required relation '${meta.relation_name}' between ${meta.model_a_name} and ${meta.model_b_name} models.`;
        break;
      case 'P2017':
        status = HttpStatus.CONFLICT;
        message = `The records for relation ${meta.relation_name} between the ${meta.parent_name} and ${meta.child_name} models are not connected.`;
        break;
      case 'P2034':
        status = HttpStatus.CONFLICT;
        message = `The transaction failed due to a write conflict or a deadlock. Please try again.`;
        break;

      // --- 500 INTERNAL SERVER ERROR (Schema/Infrastructure) ---
      case 'P2004':
        message = `A constraint failed on the database: ${meta.database_error}`;
        break;
      case 'P2007':
        message = `Data validation error: ${meta.database_error}`;
        break;
      case 'P2008':
        message = `Failed to parse the query ${meta.query_parsing_error} at ${meta.query_position}`;
        break;
      case 'P2009':
        message = `Failed to validate the query: ${meta.query_validation_error} at ${meta.query_position}`;
        break;
      case 'P2010':
        message = `Raw query failed. Code: ${meta.code}. Message: ${meta.message}`;
        break;
      case 'P2016':
        message = `Query interpretation error. ${meta.details}`;
        break;
      case 'P2021':
        message = `The table ${meta.table} does not exist in the current database.`;
        break;
      case 'P2022':
        message = `The column ${meta.column} does not exist in the current database.`;
        break;
      case 'P2023':
        message = `Inconsistent column data: ${meta.message}`;
        break;
      case 'P2024':
        status = HttpStatus.GATEWAY_TIMEOUT;
        message = `Timed out fetching a new connection from the pool.`;
        break;
      case 'P2026':
        message = `The current database provider doesn't support a feature used in the query: ${meta.feature}`;
        break;
      case 'P2027':
        message = `Multiple errors occurred on the database during query execution: ${meta.errors}`;
        break;
      case 'P2030':
        message = `Cannot find a fulltext index to use for the search.`;
        break;
      case 'P2031':
        message = `Prisma needs transactions, which requires your MongoDB server to be running as a replica set.`;
        break;
      case 'P2035':
        message = `Assertion violation on the database: ${meta.database_error}`;
        break;
      case 'P2036':
        message = `Error in external connector (id ${meta.id})`;
        break;
      case 'P2037':
        message = `Too many database connections open: ${meta.message}`;
        break;
    }

    this.logger.error(`[${errorCode}] ${message}`);

    response.status(status).json({
      statusCode: status,
      message: message,
      errorCode: errorCode,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
