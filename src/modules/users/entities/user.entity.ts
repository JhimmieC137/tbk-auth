import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_TYPE } from '../dtos/enums';
import { Profile } from './profile.entity';
import { Kyc } from './kyc.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: USER_TYPE,
    default: USER_TYPE.CLIENT,
  })
  role: USER_TYPE;

  @OneToOne(() => Kyc, (kyc) => kyc.user_id) // specify inverse side as a second parameter
  @JoinColumn()
  kyc: Kyc
  
  @OneToOne(() => Profile, (profile) => profile.user_id) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile

  @CreateDateColumn({
    nullable: true
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updated_at: Date;

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at: Date;
}