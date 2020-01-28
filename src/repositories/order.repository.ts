import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Order, OrderRelations, User} from '../models';
import {SqldbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderId,
  OrderRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Order.prototype.orderId>;

  constructor(
    @inject('datasources.sqldb') dataSource: SqldbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Order, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
