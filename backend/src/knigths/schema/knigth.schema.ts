import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        mod: { type: Number, required: true },
        attr: { type: String, required: true },
        equipped: { type: Boolean, required: true },
      },
    ],
    required: true,
  })
  weapons: {
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
  }[];

  @Prop({
    type: {
      strength: { type: Number, required: true },
      dexterity: { type: Number, required: true },
      constitution: { type: Number, required: true },
      intelligence: { type: Number, required: true },
      wisdom: { type: Number, required: true },
      charisma: { type: Number, required: true },
    },
    required: true,
  })
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @Prop({ required: true })
  keyAttribute: string;
}

export type KnightDocument = Knight & Document;

export const KnightSchema = SchemaFactory.createForClass(Knight);
