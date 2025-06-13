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
                reviews: [],
                createdBy: { user: users[0]._id.toString() }
            },
            {
                name: 'Zapatillas deportivas',
                description: 'Cómodas y resistentes para correr o caminar.',
                price: 59.99,
                category: 'Calzado',
                stock: 30,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Camisa casual',
                description: 'Camisa de algodón ideal para el día a día.',
                price: 35.50,
                category: 'Ropa',
                stock: 45,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Smartwatch fitness',
                description: 'Reloj inteligente con seguimiento de actividad física.',
                price: 89.00,
                category: 'Tecnología',
                stock: 25,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Mochila urbana',
                description: 'Espaciosa, con compartimiento para laptop.',
                price: 39.90,
                category: 'Accesorios',
                stock: 20,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Auriculares inalámbricos',
                description: 'Bluetooth 5.0, sonido envolvente y estuche de carga.',
                price: 49.99,
                category: 'Tecnología',
                stock: 40,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Pantalón de jean',
                description: 'Corte slim, resistente y cómodo.',
                price: 44.90,
                category: 'Ropa',
                stock: 32,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Bolso de mano',
                description: 'Bolso elegante y práctico para uso diario.',
                price: 29.99,
                category: 'Accesorios',
                stock: 15,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Lámpara LED de escritorio',
                description: 'Con brazo flexible y brillo regulable.',
                price: 24.50,
                category: 'Hogar',
                stock: 28,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
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
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Teclado mecánico retroiluminado',
                description: 'Switches rojos, ideal para gaming y oficina.',
                price: 79.99,
                category: 'Tecnología',
                stock: 18,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Mouse inalámbrico ergonómico',
                description: 'Diseño cómodo, batería de larga duración.',
                price: 27.90,
                category: 'Tecnología',
                stock: 36,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Sandalias de verano',
                description: 'Livianas y antideslizantes.',
                price: 22.00,
                category: 'Calzado',
                stock: 21,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Cartera de cuero',
                description: 'Diseño elegante y varios compartimientos.',
                price: 64.99,
                category: 'Accesorios',
                stock: 12,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Cargador portátil 10.000mAh',
                description: 'Ideal para cargar en cualquier lugar.',
                price: 34.50,
                category: 'Tecnología',
                stock: 27,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Bufanda de lana',
                description: 'Calidez asegurada para el invierno.',
                price: 18.75,
                category: 'Ropa',
                stock: 38,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Zapatillas urbanas',
                description: 'Estilo moderno con suela antideslizante.',
                price: 58.00,
                category: 'Calzado',
                stock: 24,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Laptop sleeve 15"',
                description: 'Funda acolchada resistente al agua.',
                price: 21.95,
                category: 'Accesorios',
                stock: 19,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Set de herramientas básico',
                description: 'Perfecto para arreglos del hogar.',
                price: 45.00,
                category: 'Hogar',
                stock: 14,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Parlante Bluetooth portátil',
                description: 'Sonido potente con resistencia al agua.',
                price: 54.95,
                category: 'Tecnología',
                stock: 26,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Billetera de cuero',
                description: 'Diseño clásico, con espacio para tarjetas.',
                price: 23.99,
                category: 'Accesorios',
                stock: 22,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Pijama cómodo de algodón',
                description: 'Perfecto para descansar con estilo.',
                price: 28.50,
                category: 'Ropa',
                stock: 31,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Chaleco impermeable',
                description: 'Ideal para caminatas bajo la lluvia.',
                price: 41.25,
                category: 'Ropa',
                stock: 17,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Almohada viscoelástica',
                description: 'Soporte ergonómico para un mejor descanso.',
                price: 36.99,
                category: 'Hogar',
                stock: 29,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            },
            {
                name: 'Estuche rígido para gafas',
                description: 'Protección garantizada para tus lentes.',
                price: 11.75,
                category: 'Accesorios',
                stock: 42,
                images: [],
                reviews: [],
                createdBy: { user: randomFromArray(users)._id.toString() }
            }
        ]);

        console.log('✅ Productos insertados');
    } catch (error) {
        console.error('❌ Error durante el seed:', error);
    }
};

connectDB();
seedData();
