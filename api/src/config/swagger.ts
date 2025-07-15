import * as swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Warehouse Management API',
    version: '1.0.0',
    description: 'Complete warehouse management system with authentication, inventory tracking, and QR code integration',
    contact: {
      name: 'API Support',
      email: 'support@warehouse.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          status: {
            type: 'string'
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          role: {
            type: 'string',
            enum: ['admin', 'operator', 'viewer']
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Sector: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Aisle: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          sectorId: {
            type: 'integer'
          },
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Slot: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          aisleId: {
            type: 'integer'
          },
          code: {
            type: 'string'
          },
          floor: {
            type: 'integer'
          },
          status: {
            type: 'string',
            enum: ['available', 'occupied', 'maintenance']
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          category: {
            type: 'string'
          },
          weight: {
            type: 'number'
          },
          dimensions: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Pallet: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          type: {
            type: 'string',
            enum: ['master', 'single']
          },
          slotId: {
            type: 'integer',
            nullable: true
          },
          userId: {
            type: 'integer',
            nullable: true
          },
          productId: {
            type: 'integer',
            nullable: true
          },
          qrCode: {
            type: 'string'
          },
          qrCodeSmall: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      PalletProduct: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          palletId: {
            type: 'integer'
          },
          productId: {
            type: 'integer'
          },
          quantity: {
            type: 'integer',
            minimum: 1
          },
          expiryDate: {
            type: 'string',
            format: 'date',
            nullable: true
          },
          manufactureDate: {
            type: 'string',
            format: 'date',
            nullable: true
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJSDoc(options);
