import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'
import { AddAccountRepository } from '../../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypeter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypeter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
