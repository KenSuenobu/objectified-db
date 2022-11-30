import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {
  ApiBody, ApiConflictResponse,
  ApiCreatedResponse, ApiForbiddenResponse,
  ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ClassesService} from './class.service';
import {ClassDto} from '../dto/class.dto';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  private readonly logger = new Logger('class.controller');

  constructor(private readonly service: ClassesService) {}

  @Post('/create')
  @ApiBody({
    description: 'The class to create',
    type: ClassDto,
  })
  @ApiOperation({
    summary: 'Creates a Class',
    description: 'Creates a new `Class` definition in the `Objectified` system layer.  `Class`es ' +
      'define dynamic data schemas.'
  })
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createNamespace(@Body() payload: ClassDto): Promise<ClassDto> {
    return this.service.createClass(payload);
  }

  @Put('/:id/edit')
  @ApiParam({
    name: 'id',
    description: 'The ID of the `Class` to modify',
  })
  @ApiBody({
    description: 'The `Class` to edit',
    type: ClassDto,
  })
  @ApiOperation({
    summary: 'Edits a Class',
    description: 'Edits a `Class` entry by its ID.'
  })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async editNamespace(@Param('id') id: number, @Body() payload: ClassDto) {
    return this.service.editClass(id, payload);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the `Class` to delete',
  })
  @ApiOperation({
    summary: 'Deletes a Class',
    description: 'Deletes a `Class` entry by its ID.'
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async deleteNamespace(@Param('id') id: number) {
    return this.service.deleteClass(id);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the `Class` to get',
  })
  @ApiOperation({
    summary: 'Retrieves a Class by its ID',
    description: 'Retrieves a `Class` entry by its ID.'
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getNamespace(@Param('id') id: number): Promise<ClassDto> {
    return this.service.getClass(id);
  }

  @Get('/list')
  @ApiParam({
    name: 'id',
    description: 'The ID of the `Namespace` to reference',
  })
  @ApiOperation({
    summary: 'Lists all Classes by Namespace ID',
    description: 'Retrieves a list of all `Classes` registered in `Objectified` to the specified `Namespace` ID.'
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listNamespaces(namespaceId: number): Promise<ClassDto[]> {
    return this.service.listClasses(namespaceId);
  }

  @Get('/find/:value')
  @ApiOperation({
    summary: 'Searches for a Class',
    description: 'Searches for `Class`s by both the name and description based on the value provided.  Class ' +
      'searches are case-insensitive.',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async findNamespaces(@Param('value') value: string): Promise<ClassDto[]> {
    return this.service.findClasses(value);
  }

}