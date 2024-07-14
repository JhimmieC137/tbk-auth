import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'; 
  
@Entity('token_blacklist')
export class TokenBlacklist {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({
        nullable: false
    })
    token: String;

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