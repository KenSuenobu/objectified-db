import {Injectable, Logger} from '@nestjs/common';
import {NamespaceDto} from '../dto/namespace.dto';
import {ClassDto} from '../dto/class.dto';

@Injectable()
export class ClassesService {
  private readonly logger = new Logger('class.service');

  async createClass(payload: ClassDto): Promise<ClassDto> {
    throw new Error('Unimplemented');
  }

  async editClass(id: number, payload: ClassDto) {
    throw new Error('Unimplemented');
  }

  async deleteClass(id: number) {
    throw new Error('Unimplemented');
  }

  async getClass(id: number): Promise<ClassDto> {
    throw new Error('Unimplemented');
  }

  async listClasses(namespaceId: number): Promise<ClassDto[]> {
    throw new Error('Unimplemented');
  }

  async findClasses(value: string): Promise<ClassDto[]> {
    throw new Error('Unimplemented');
  }

}