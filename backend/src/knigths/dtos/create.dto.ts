import {
  IsString,
  IsDate,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';

export class CreateKnightDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly nickname: string;

  @IsNotEmpty()
  @IsDate()
  readonly birthday: Date;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly weapons: {
    name: string;
    attr: string;
    equipped: boolean;
    mod: number;
  }[];

  @IsNotEmpty()
  readonly attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @IsNotEmpty()
  @IsString()
  readonly keyAttribute: string;
}
