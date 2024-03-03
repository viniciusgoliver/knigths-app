import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsController } from './knight.controller';
import { KnightsService } from './knight.service';
import { Knight, KnightSchema } from './schema/knigth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
