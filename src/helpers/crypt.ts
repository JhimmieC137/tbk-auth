import { match } from 'assert';
import * as bcrypt from 'bcryptjs';
import { baseConfig } from 'src/settings/base.config';

export const hashedPassword = async ( password: string ): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(baseConfig().saltRounds));
    const hash = await bcrypt.hash(password, salt);

    return hash;
};


export const isMatch = async ( password: string, hashedPassword: string ): Promise<string> => {
    const is_match = await bcrypt.compare(password, hashedPassword)
    return is_match;    
};

