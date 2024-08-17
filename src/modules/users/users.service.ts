import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../../model/User/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async createUser(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashedPassword, name });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async updateOneById(id: number, data: Partial<User>): Promise<User> {
    await this.userModel.update(data, { where: { id } });
    return this.userModel.findByPk(id);
  }
}
