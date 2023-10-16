import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Facture} from '../models';
import {FactureRepository} from '../repositories';

export class FactureController {
  constructor(
    @repository(FactureRepository)
    public factureRepository : FactureRepository,
  ) {}

  @post('/factures')
  @response(200, {
    description: 'Facture model instance',
    content: {'application/json': {schema: getModelSchemaRef(Facture)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facture, {
            title: 'NewFacture',
            exclude: ['id'],
          }),
        },
      },
    })
    facture: Omit<Facture, 'id'>,
  ): Promise<Facture> {
    return this.factureRepository.create(facture);
  }

  @get('/factures/count')
  @response(200, {
    description: 'Facture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Facture) where?: Where<Facture>,
  ): Promise<Count> {
    return this.factureRepository.count(where);
  }

  @get('/factures')
  @response(200, {
    description: 'Array of Facture model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Facture, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Facture) filter?: Filter<Facture>,
  ): Promise<Facture[]> {
    return this.factureRepository.find(filter);
  }

  @patch('/factures')
  @response(200, {
    description: 'Facture PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facture, {partial: true}),
        },
      },
    })
    facture: Facture,
    @param.where(Facture) where?: Where<Facture>,
  ): Promise<Count> {
    return this.factureRepository.updateAll(facture, where);
  }

  @get('/factures/{id}')
  @response(200, {
    description: 'Facture model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Facture, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Facture, {exclude: 'where'}) filter?: FilterExcludingWhere<Facture>
  ): Promise<Facture> {
    return this.factureRepository.findById(id, filter);
  }

  @patch('/factures/{id}')
  @response(204, {
    description: 'Facture PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facture, {partial: true}),
        },
      },
    })
    facture: Facture,
  ): Promise<void> {
    await this.factureRepository.updateById(id, facture);
  }

  @put('/factures/{id}')
  @response(204, {
    description: 'Facture PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facture: Facture,
  ): Promise<void> {
    await this.factureRepository.replaceById(id, facture);
  }

  @del('/factures/{id}')
  @response(204, {
    description: 'Facture DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.factureRepository.deleteById(id);
  }
}
