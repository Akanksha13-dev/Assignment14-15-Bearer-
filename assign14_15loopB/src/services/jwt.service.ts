import {TokenService} from '@loopback/authentication'
import {inject} from '@loopback/core'
import {HttpErrors} from '@loopback/rest'
import {securityId, UserProfile} from '@loopback/security'
//Convert promises to callback
import {promisify} from 'util'
import {TokenServiceBindings} from '../keys'

const jwt = require('jsonwebtoken')
//convert callback to promise
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)
export class JWTService implements TokenService {


    @inject(TokenServiceBindings.TOKEN_SECRET)
    public readonly jwtSecret: string;
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    public readonly jwtExpiresIn: string;

    async generateToken(userProfile: UserProfile): Promise<string> {

        if (!userProfile) {
            throw new HttpErrors.Unauthorized("Error while generating token: User Profile is null")
        }
        let token = '';
        try {
            token = signAsync(userProfile, this.jwtSecret, {
                expiresIn: this.jwtExpiresIn
            })
        }
        catch (err) {
            throw new HttpErrors.Unauthorized(`Error while generating token: ${err}`)
        }
        return token;
    }
    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(`Error Verifying Token: 'Token' is null`)
        }
        let userProfile: UserProfile
        try {
            const decryptedToken = await verifyAsync(token, this.jwtSecret)
            userProfile = {
                id:decryptedToken.id,
                [securityId]: decryptedToken.id,
                name: decryptedToken.name
            }
        }
        catch (err) {
            throw new HttpErrors.Unauthorized(`Error while Verifying Token: Token Not Valid`)
        }
        //console.log('userProfile.id11',userProfile.id);
        return userProfile
    }

}
