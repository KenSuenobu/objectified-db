import { Module } from "@nestjs/common";
import { ClassesController } from "../../objectified-services/src/controllers/class.controller";
import { ClassesService } from "../../objectified-services/src/services/class.service";
import { DatatypeController } from "./controllers/datatype.controller";
import { DatatypeService } from "./controllers/datatype.service";
import { FieldsController } from "./controllers/field.controller";
import { FieldsService } from "./controllers/field.service";
import { PropertiesController } from "./controllers/property.controller";
import { PropertiesService } from "./controllers/property.service";
import { ObjectPropertiesController } from "./controllers/object-property.controller";
import { ObjectPropertiesService } from "./controllers/object-property.service";
import { ClassPropertiesService } from "./controllers/class-property.service";
import { ClassPropertiesController } from "./controllers/class-property.controller";
import { InstancesController } from "./controllers/instance.controller";
import { InstancesService } from "./controllers/instance.service";

@Module({
  imports: [],
  controllers: [
    ClassesController,
    DatatypeController,
    FieldsController,
    PropertiesController,
    ObjectPropertiesController,
    ClassPropertiesController,
    InstancesController,
  ],
  providers: [
    ClassesService,
    DatatypeService,
    FieldsService,
    PropertiesService,
    ObjectPropertiesService,
    ClassPropertiesService,
    InstancesService,
  ],
})
export class AppModule {}
