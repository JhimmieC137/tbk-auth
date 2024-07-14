import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
  
  
  @Entity('kycs')
  export class Kyc {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({
        nullable: false
    })
    user_id: String;

    @Column({ 
        default: false,
        nullable: false
    })
    is_email_verified: boolean;
    
    @Column({ 
        default: false,
        nullable: false
    })
    is_phone_verified: boolean;
    
    @Column({ 
        default: false,
        nullable: false
    })
    is_ID_verified: boolean;

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