import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Knight } from './schema/knigth.schema';
import { CreateKnightDTO } from './dtos/create.dto';
import { Model } from 'mongoose';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private readonly knightModel: Model<Knight>,
  ) {}

  async create(createKnightDTO: CreateKnightDTO): Promise<Knight> {
    // eslint-disable-next-line new-cap
    const createKnight = new this.knightModel(createKnightDTO);

    return createKnight.save();
  }

  async findAll(): Promise<Knight[]> {
    return this.knightModel.find().exec();
  }

  async findHeroes(): Promise<Knight[]> {
    const knights = await this.knightModel.find().exec();
    return knights.filter((knight) => {
      if (knight.keyAttribute && knight.attributes) {
        const keyAttribute = knight.keyAttribute.toLowerCase();
        const keyAttrValue = knight.attributes[keyAttribute];
        return keyAttrValue >= 16; // Apenas knights com atributo chave maior ou igual a 16 são considerados heróis
      }
      return false; // Se keyAttribute ou attributes forem undefined, não considerar este knight como herói
    });
  }

  async findOne(id: string): Promise<Knight> {
    return this.knightModel.findById(id).exec();
  }

  async update(
    id: string,
    updateKnightDto: Partial<CreateKnightDTO>,
  ): Promise<Knight> {
    return this.knightModel.findByIdAndUpdate(id, updateKnightDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.knightModel.findByIdAndDelete(id).exec();
  }

  calculateAttack(knight: Knight): number {
    const keyAttribute = knight.keyAttribute.toLowerCase();
    const keyAttrValue = knight.attributes[keyAttribute];
    const equippedWeaponMod = knight.weapons.find(
      (weapon) => weapon.equipped,
    ).mod;

    let mod = -2;
    if (keyAttrValue >= 9 && keyAttrValue <= 10) {
      mod = -1;
    } else if (keyAttrValue >= 11 && keyAttrValue <= 12) {
      mod = 0;
    } else if (keyAttrValue >= 13 && keyAttrValue <= 15) {
      mod = 1;
    } else if (keyAttrValue >= 16 && keyAttrValue <= 18) {
      mod = 2;
    } else if (keyAttrValue >= 19 && keyAttrValue <= 20) {
      mod = 3;
    }

    return 10 + mod + equippedWeaponMod;
  }

  calculateExperience(knight: Knight): number {
    const age =
      (new Date().getTime() - new Date(knight.birthday).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }
}
