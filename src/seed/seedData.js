const connectDB = require('../../config/db.js');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const bcryptjs = require('bcryptjs');

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedData = async () => {
    try {
        // Limpiar colecciones
        await User.deleteMany();
        await Product.deleteMany();

        // Crear usuarios
        const hashedPassword = bcryptjs.hashSync('123456', 10);
        const users = await User.insertMany([
            {
                name: 'Juan',
                lastname: 'Pérez',
                email: 'juan@example.com',
                password: hashedPassword,
                address: {
                    street: 'Calle Falsa 123',
                    city: 'Buenos Aires',
                    country: 'Argentina'
                },
                favorites: []
            },
            {
                name: 'Ana',
                lastname: 'García',
                email: 'ana@example.com',
                password: hashedPassword,
                address: {
                    street: 'Av. Siempre Viva 742',
                    city: 'Madrid',
                    country: 'España'
                },
                favorites: []
            },
            {
                name: 'Lucas',
                lastname: 'Martínez',
                email: 'lucas@example.com',
                password: hashedPassword,
                address: {
                    street: 'Rua Alegría 456',
                    city: 'São Paulo',
                    country: 'Brasil'
                },
                favorites: []
            },
            {
                name: 'Sofía',
                lastname: 'López',
                email: 'sofia@example.com',
                password: hashedPassword,
                address: {
                    street: 'Calle Luna 987',
                    city: 'Montevideo',
                    country: 'Uruguay'
                },
                favorites: []
            },
            {
                name: 'Carlos',
                lastname: 'Ramírez',
                email: 'carlos@example.com',
                password: hashedPassword,
                address: {
                    street: 'Av. Reforma 321',
                    city: 'Ciudad de México',
                    country: 'México'
                },
                favorites: []
            },
            {
                name: 'María',
                lastname: 'Fernández',
                email: 'maria@example.com',
                password: hashedPassword,
                address: {
                  street: 'Calle Mayor 101',
                  city: 'Barcelona',
                  country: 'España'
                },
                favorites: []
            },
            {
                name: 'Diego',
                lastname: 'Torres',
                email: 'diego@example.com',
                password: hashedPassword,
                address: {
                  street: 'Av. del Libertador 2500',
                  city: 'Buenos Aires',
                  country: 'Argentina'
                },
                favorites: []
            }
        ]);

        console.log('✅ Usuarios insertados');

        // Crear productos
        const products = await Product.insertMany([
            {
                name: 'Camisa clásica',
                description: 'Camisa de algodón 100%, ideal para uso diario.',
                price: 25.99,
                category: 'Ropa',
                stock: 50,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 5,
                        text: "Excelente calidad, la volvería a comprar.",
                        createdAt: new Date(2025, 5, 15)
                    },
                    {
                        user: users[4]._id.toString(),
                        rating: 4,
                        text: "Buena tela, aunque un poco justa.",
                        createdAt: new Date(2025, 5, 22)
                    }
                ],
                createdBy: { user: users[0]._id.toString() }
            },
            {
                name: 'Zapatillas deportivas',
                description: 'Cómodas y resistentes para correr o caminar.',
                price: 59.99,
                category: 'Calzado',
                stock: 30,
                images: [],
                reviews: [
                    {
                        user: users[0]._id.toString(),
                        rating: 5,
                        text: "Muy cómodas y buena amortiguación.",
                        createdAt: new Date(2025, 5, 16)
                    },
                    {
                        user: users[5]._id.toString(),
                        rating: 4,
                        text: "Me encantaron, aunque el talle fue justo.",
                        createdAt: new Date(2025, 6, 3)
                    }
                ],
                createdBy: { user: users[2]._id.toString() }
            },
            {
                name: 'Camisa casual',
                description: 'Camisa de algodón ideal para el día a día.',
                price: 35.50,
                category: 'Ropa',
                stock: 45,
                images: [],
                reviews: [
                    {
                        user: users[4]._id.toString(),
                        rating: 5,
                        text: "Perfecta para salir, muy buen corte.",
                        createdAt: new Date(2025, 3, 14)
                    },
                    {
                        user: users[3]._id.toString(),
                        rating: 4,
                        text: "Buena relación precio-calidad.",
                        createdAt: new Date(2025, 4, 23)
                    }
                ],
                createdBy: { user: users[6]._id.toString() }
            },
            {
                name: 'Smartwatch fitness',
                description: 'Reloj inteligente con seguimiento de actividad física.',
                price: 89.00,
                category: 'Tecnología',
                stock: 25,
                images: [],
                reviews: [
                    {
                        user: users[3]._id.toString(),
                        rating: 4,
                        text: 'Podría mejorar algunos detalles.',
                        createdAt: new Date(2025, 6, 20)
                    },
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Mochila urbana',
                description: 'Espaciosa, con compartimiento para laptop.',
                price: 39.90,
                category: 'Accesorios',
                stock: 20,
                images: [],
                reviews: [
                    {
                        user: users[0]._id.toString(),
                        rating: 4,
                        text: 'Excelente calidad, la volvería a comprar.',
                        createdAt: new Date(2025, 5, 23)
                    },
                    {
                        user: users[2]._id.toString(),
                        rating: 5,
                        text: 'La uso todos los días, muy práctica.',
                        createdAt: new Date(2025, 6, 10)
                    },
                ],
                createdBy: { user: users[4]._id.toString() }
            },
            {
                name: 'Auriculares inalámbricos',
                description: 'Bluetooth 5.0, sonido envolvente y estuche de carga.',
                price: 49.99,
                category: 'Tecnología',
                stock: 40,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'Está bien, pero esperaba algo más.',
                        createdAt: new Date(2025, 5, 2)
                    },
                ],
                createdBy: { user: users[4]._id.toString() }
            },
            {
                name: 'Pantalón de jean',
                description: 'Corte slim, resistente y cómodo.',
                price: 44.90,
                category: 'Ropa',
                stock: 32,
                images: [],
                reviews: [
                    {
                        user: users[6]._id.toString(),
                        rating: 4,
                        text: 'Buen precio por lo que ofrece.',
                        createdAt: new Date(2025, 5, 31)
                    },
                    {
                        user: users[3]._id.toString(),
                        rating: 3,
                        text: 'Me llegó en buen estado y funciona perfecto.',
                        createdAt: new Date(2025, 6, 19)
                    },
                    {
                        user: users[1]._id.toString(),
                        rating: 5,
                        text: 'Muy buen producto, cumple con lo prometido.',
                        createdAt: new Date(2025, 6, 23)
                    },
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Bolso de mano',
                description: 'Bolso elegante y práctico para uso diario.',
                price: 29.99,
                category: 'Accesorios',
                stock: 15,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 4,
                        text: 'Ideal para el uso diario, lo recomiendo.',
                        createdAt: new Date(2025, 2, 20)
                    },
                    {
                        user: users[3]._id.toString(),
                        rating: 5,
                        text: 'Muy satisfecho con la compra.',
                        createdAt: new Date(2025, 3, 2)
                    },
                    {
                        user: users[6]._id.toString(),
                        rating: 3,
                        text: 'Cumple, pero esperaba un poco más.',
                        createdAt: new Date(2025, 3, 23)
                    },
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'Buen tamaño y materiales resistentes.',
                        createdAt: new Date(2025, 5, 12)
                    },
                    {
                        user: users[5]._id.toString(),
                        rating: 5,
                        text: 'Perfecto, volveré a comprar seguro.',
                        createdAt: new Date(2025, 6, 7)
                    },
                ],
                createdBy: { user: users[4]._id.toString() }
            },
            {
                name: 'Lámpara LED de escritorio',
                description: 'Con brazo flexible y brillo regulable.',
                price: 24.50,
                category: 'Hogar',
                stock: 28,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 3,
                        text: 'Me llegó en buen estado y funciona perfecto.',
                        createdAt: new Date(2025, 5, 28)
                    },
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Camiseta básica',
                description: 'Camiseta 100% algodón, varios colores.',
                price: 14.99,
                category: 'Ropa',
                stock: 60,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Gorra estilo urbano',
                description: 'Ajustable y transpirable.',
                price: 19.99,
                category: 'Accesorios',
                stock: 33,
                images: [],
                reviews: [
                    {
                        user: users[0]._id.toString(),
                        rating: 3,
                        text: 'Llegó con un pequeño defecto.',
                        createdAt: new Date(2025, 6, 1)
                    },
                ],
                createdBy: { user: users[5]._id.toString() }
            },
            {
                name: 'Teclado mecánico retroiluminado',
                description: 'Switches rojos, ideal para gaming y oficina.',
                price: 79.99,
                category: 'Tecnología',
                stock: 18,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 4,
                        text: 'Buena relación precio-calidad.',
                        createdAt: new Date(2025, 3, 29)
                    },
                    {
                        user: users[4]._id.toString(),
                        rating: 4,
                        text: 'Buen diseño y materiales duraderos.',
                        createdAt: new Date(2025, 5, 11)
                    },
                ],
                createdBy: { user: users[0]._id.toString() }
            },
            {
                name: 'Mouse inalámbrico ergonómico',
                description: 'Diseño cómodo, batería de larga duración.',
                price: 27.90,
                category: 'Tecnología',
                stock: 36,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 5,
                        text: 'La calidad superó mis expectativas.',
                        createdAt: new Date(2025, 5, 20)
                    },
                    {
                        user: users[6]._id.toString(),
                        rating: 4,
                        text: 'Muy práctico y fácil de usar.',
                        createdAt: new Date(2025, 6, 17)
                    },
                ],
                createdBy: { user: users[5]._id.toString() }
            },
            {
                name: 'Sandalias de verano',
                description: 'Livianas y antideslizantes.',
                price: 22.00,
                category: 'Calzado',
                stock: 21,
                images: [],
                reviews: [
                    {
                        user: users[3]._id.toString(),
                        rating: 5,
                        text: 'Muy buena calidad, estoy contento con la compra.',
                        createdAt: new Date(2025, 6, 20)
                    },
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Cartera de cuero',
                description: 'Diseño elegante y varios compartimientos.',
                price: 64.99,
                category: 'Accesorios',
                stock: 12,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'No me gustó y muy cara.',
                        createdAt: new Date(2025, 6, 10)
                    }
                ],
                createdBy: { user: users[5]._id.toString() }
            },
            {
                name: 'Cargador portátil 10.000mAh',
                description: 'Ideal para cargar en cualquier lugar.',
                price: 34.50,
                category: 'Tecnología',
                stock: 27,
                images: [],
                reviews: [
                    {
                        user: users[3]._id.toString(),
                        rating: 5,
                        text: 'Perfecto para mi uso diario.',
                        createdAt: new Date(2025, 5, 10)
                    },
                    {
                        user: users[5]._id.toString(),
                        rating: 4,
                        text: 'Buen producto, recomendable.',
                        createdAt: new Date(2025, 5, 25)
                    },
                    {
                        user: users[6]._id.toString(),
                        rating: 3,
                        text: 'Llegó con retraso, pero funciona bien.',
                        createdAt: new Date(2025, 6, 3)
                    },
                ],
                createdBy: { user: users[0]._id.toString() }
            },
            {
                name: 'Bufanda de lana',
                description: 'Calidez asegurada para el invierno.',
                price: 18.75,
                category: 'Ropa',
                stock: 38,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'Producto útil y bien presentado.',
                        createdAt: new Date(2025, 6, 2)
                    }
                ],
                createdBy: { user: users[6]._id.toString() }
            },
            {
                name: 'Zapatillas urbanas',
                description: 'Estilo moderno con suela antideslizante.',
                price: 58.00,
                category: 'Calzado',
                stock: 24,
                images: [],
                reviews: [
                    {
                        user: users[4]._id.toString(),
                        rating: 5,
                        text: 'Muy buena calidad, estoy contento con la compra.',
                        createdAt: new Date(2025, 4, 8)
                    },
                    {
                        user: users[0]._id.toString(),
                        rating: 4,
                        text: 'Funciona bien, cumple su función.',
                        createdAt: new Date(2025, 6, 5)
                    },
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Laptop sleeve 15"',
                description: 'Funda acolchada resistente al agua.',
                price: 21.95,
                category: 'Accesorios',
                stock: 19,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 5,
                        text: 'Muy cómodo y bien hecho.',
                        createdAt: new Date(2025, 6, 13)
                    },
                    {
                        user: users[3]._id.toString(),
                        rating: 3,
                        text: 'No está mal, pero tiene margen de mejora.',
                        createdAt: new Date(2025, 6, 14)
                    },
                ],
                createdBy: { user: users[2]._id.toString() }
            },
            {
                name: 'Set de herramientas básico',
                description: 'Perfecto para arreglos del hogar.',
                price: 45.00,
                category: 'Hogar',
                stock: 14,
                images: [],
                reviews: [
                    {
                        user: users[0]._id.toString(),
                        rating: 4,
                        text: 'Buen valor por el precio.',
                        createdAt: new Date(2025, 5, 22)
                    },
                    {
                        user: users[4]._id.toString(),
                        rating: 5,
                        text: 'Excelente opción, lo recomiendo.',
                        createdAt: new Date(2025, 6, 13)
                    }
                ],
                createdBy: { user: users[3]._id.toString() }
            },
            {
                name: 'Parlante Bluetooth portátil',
                description: 'Sonido potente con resistencia al agua.',
                price: 54.95,
                category: 'Tecnología',
                stock: 26,
                images: [],
                reviews: [
                    {
                        user: users[3]._id.toString(),
                        rating: 4,
                        text: 'Funciona tal cual como se describe.',
                        createdAt: new Date(2025, 4, 1)
                    },
                    {
                        user: users[6]._id.toString(),
                        rating: 5,
                        text: 'Super recomendable, me encantó.',
                        createdAt: new Date(2025, 5, 23)
                    }
                ],
                createdBy: { user: users[1]._id.toString() }
            },
            {
                name: 'Billetera de cuero',
                description: 'Diseño clásico, con espacio para tarjetas.',
                price: 23.99,
                category: 'Accesorios',
                stock: 22,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 3,
                        text: 'Llegó con un pequeño defecto.',
                        createdAt: new Date(2025, 6, 2)
                    },
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'Muy útil, lo uso constantemente.',
                        createdAt: new Date(2025, 6, 19)
                    },
                ],
                createdBy: { user: users[4]._id.toString() }
            },
            {
                name: 'Pijama cómodo de algodón',
                description: 'Perfecto para descansar con estilo.',
                price: 28.50,
                category: 'Ropa',
                stock: 31,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 4,
                        text: 'Ideal para el uso diario, lo recomiendo.',
                        createdAt: new Date(2025, 6, 10)
                    },
                ],
                createdBy: { user: users[5]._id.toString() }
            },
            {
                name: 'Chaleco impermeable',
                description: 'Ideal para caminatas bajo la lluvia.',
                price: 41.25,
                category: 'Ropa',
                stock: 17,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(),
                        rating: 4,
                        text: 'Producto fiel a la descripción.',
                        createdAt: new Date(2025, 5, 12)
                    },
                    {
                        user: users[0]._id.toString(),
                        rating: 5,
                        text: 'Muy cómodo y bien hecho.',
                        createdAt: new Date(2025, 6, 17)
                    },
                ],
                createdBy: { user: users[6]._id.toString() }
            },
            {
                name: 'Almohada viscoelástica',
                description: 'Soporte ergonómico para un mejor descanso.',
                price: 36.99,
                category: 'Hogar',
                stock: 29,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 5,
                        text: 'La calidad superó mis expectativas.',
                        createdAt: new Date(2025, 5, 27)
                    },
                ],
                createdBy: { user: users[5]._id.toString() }
            },
            {
                name: 'Estuche rígido para gafas',
                description: 'Protección garantizada para tus lentes.',
                price: 11.75,
                category: 'Accesorios',
                stock: 42,
                images: [],
                reviews: [
                    {
                        user: users[4]._id.toString(),
                        rating: 4,
                        text: 'Buen diseño y materiales duraderos.',
                        createdAt: new Date(2025, 1, 29)
                    },
                    {
                        user: users[1]._id.toString(),
                        rating: 3,
                        text: 'No era exactamente lo que esperaba.',
                        createdAt: new Date(2025, 4, 14)
                    },
                ],
                createdBy: { user: users[3]._id.toString() }
            },
            {
                name: "Toyota Corolla 2022",
                description: "Sedán confiable, eficiente en combustible y con gran espacio interior.",
                price: 21500,
                category: "Vehiculos",
                stock: 3,
                images: [],
                reviews: [
                    {
                        user: users[3]._id.toString(),
                        rating: 5,
                        text: 'El vehículo llegó impecable y funciona perfecto.',
                        createdAt: new Date(2025, 3, 18)
                    },
                    {
                        user: users[1]._id.toString(),
                        rating: 4,
                        text: 'Muy buena relación precio-calidad, recomendable.',
                        createdAt: new Date(2025, 5, 6)
                    },
                ],
                createdBy: { user: users[6]._id.toString() }
            },
            {
                name: "Volkswagen Golf GTI",
                description: "Hatchback deportivo con excelente rendimiento y estilo moderno.",
                price: 28900,
                category: "Vehiculos",
                stock: 2,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 5,
                        text: 'Muy cómodo y seguro, superó mis expectativas.',
                        createdAt: new Date(2025, 6, 21)
                    },
                ],
                createdBy: { user: users[0]._id.toString() },
            },
            {
                name: "Chevrolet Tracker LTZ",
                description: "SUV compacto con conectividad avanzada y gran seguridad.",
                price: 24900,
                category: "Vehiculos",
                stock: 4,
                images: [],
                reviews: [
                    {
                        user: users[2]._id.toString(),
                        rating: 5,
                        text: 'Excelente rendimiento, lo uso todos los días.',
                        createdAt: new Date(2025, 5, 16)
                    },
                    {
                        user: users[0]._id.toString(),
                        rating: 3,
                        text: 'Tuve que hacerle ajustes, pero anda bien.',
                        createdAt: new Date(2025, 6, 12)
                    },
                    {
                        user: users[5]._id.toString(),
                        rating: 4,
                        text: 'Ideal para moverse en la ciudad.',
                        createdAt: new Date(2025, 6, 14)
                    },
                ],
                createdBy: { user: users[3]._id.toString() },
            },
            {
                name: "Ford Mustang GT",
                description: "Muscle car clásico con potente motor V8 y diseño imponente.",
                price: 41500,
                category: "Vehiculos",
                stock: 1,
                images: [],
                reviews: [
                    { user: 
                        users[3]._id.toString(), 
                        rating: 4, 
                        text: 'Lo uso para ir al trabajo, muy práctico.', 
                        createdAt: new Date(2025, 5, 23) 
                    },
                    { 
                        user: users[1]._id.toString(), 
                        rating: 5, 
                        text: 'La entrega fue rápida y todo en orden.', 
                        createdAt: new Date(2025, 6, 17) 
                    },
                ],
                createdBy: { user: randomFromArray(users)._id.toString() },
            },
            {
                name: "Yamaha FZ 25",
                description: "Su chasis diamante junto con la suspensión y su escape Mid-ship hacen que sea un modelo maniobrable, equilibrado y ágil.",
                price: 32900,
                category: "Vehiculos",
                stock: 1,
                images: [],
                reviews: [
                    {
                        user: users[1]._id.toString(), 
                        rating: 2, 
                        text: 'No es malo, pero consume más de lo que pensaba.', 
                        createdAt: new Date(2025, 6, 20) 
                    },
                    { 
                        user: users[2]._id.toString(), 
                        rating: 5, 
                        text: 'Diseño moderno y excelente autonomía.', 
                        createdAt: new Date(2025, 6, 23) 
                    },
                ],
                createdBy: { user: users[6]._id.toString() },
            }
        ]);

        console.log('✅ Productos insertados');
    } catch (error) {
        console.error('❌ Error durante el seed:', error);
    }
};

connectDB();
seedData();
