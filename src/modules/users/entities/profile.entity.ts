import { Notification } from 'src/modules/notifications/entities/notification.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
  
  
  @Entity('profiles')
  export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false})
    user_id: string;
  
    @Column({ default: true })
    is_active: boolean;
  
    @Column({nullable: true})
    address: string;
  
    @Column({ nullable: true })
    profile_image: string;
  
    @Column({ nullable: true })
    phone: string;

    @OneToMany(() => Notification, (notification) => notification.profile) // note: we will create author property in the Photo class below
    notifications: Notification[]

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