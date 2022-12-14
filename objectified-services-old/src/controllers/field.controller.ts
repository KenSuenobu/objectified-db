import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiBody, ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {FieldsService} from './field.service';
import {FieldDto} from '../../../objectified-data/src/dto/field.dto';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  private readonly logger = new Logger('fields.controller');

  constructor(private readonly fieldsService: FieldsService) { }

  @Post('/create')
  @ApiBody({
    description: 'The field to create',
    type: FieldDto,
  })
  @ApiOperation({
    summary: 'Creates a Field',
    description: 'Creates a new `Field` definition in the `Objectified` system layer.  `Field`s contain ' +
      'definitions that define `Property` objects.'
  })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiConflictResponse()
  async createField(@Body() payload: FieldDto): Promise<FieldDto> {
    return this.fieldsService.createField(payload);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Retrieves a field by ID',
    description: 'Retrieves a full `Field` object by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the field',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FieldDto,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getFieldById(@Param('id') id: number): Promise<FieldDto> {
    return this.fieldsService.getFieldById(id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Retrieves all fields',
    description: 'Retrieves a list of all `Field`s in the Objectified system.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FieldDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listFields(): Promise<FieldDto[]> {
    return this.fieldsService.listFields();
  }

  @Put('/:id/edit')
  @ApiBody({
    description: 'The field to edit',
    type: FieldDto,
  })
  @ApiOperation({
    summary: 'Edits a Field',
    description: 'Edits a `Field` object.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the field',
  })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async editField(@Param('id') id: number, @Body() payload: FieldDto) {
    return this.fieldsService.editField(id, payload);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the field',
  })
  @ApiOperation({
    summary: 'Deletes a Field',
    description: 'Sets a `Field` disabled status, deleting the field.',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async deleteField(@Param('id') id: number) {
    return this.fieldsService.deleteField(id);
  }

}