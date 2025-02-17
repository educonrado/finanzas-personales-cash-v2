export interface Category {
    uid?: string;
    name: string;
    type: "income" | "expense";
    icon: string;
}

export const defaultCategories: Category[] = [
    {
        name: "Arriendos",
        type: "income",
        icon: "🏢"
    },
    {
        name: "Bonos",
        type: "income",
        icon: "🎁"
    },
    {
        name: "Cobro de préstamos",
        type: "income",
        icon: "💳"
    },
    {
        name: "Comisiones",
        type: "income",
        icon: "💼"
    },
    {
        name: "Fondos de reserva",
        type: "income",
        icon: "💵"
    },
    {
        name: "Interés",
        type: "income",
        icon: "📈"
    },
    {
        name: "Préstamos",
        type: "income",
        icon: "🏦"
    },
    {
        name: "Regalos",
        type: "income",
        icon: "🎁"
    },
    {
        name: "Sueldo",
        type: "income",
        icon: "💰"
    },
    {
        name: "Encargos",
        type: "income",
        icon: "📦"
    },
    {
        name: "Recibo en efectivo",
        type: "income",
        icon: "💵"
    },
    {
        name: "Inversión",
        type: "income",
        icon: "📊"
    }
    ,
    {
        name: "Ahorro",
        type: "expense",
        icon: "💰"
    },
    {
        name: "Alimentación",
        type: "expense",
        icon: "🍽️"
    },
    {
        name: "Contribución",
        type: "expense",
        icon: "💸"
    },
    {
        name: "Costos bancarios",
        type: "expense",
        icon: "🏦"
    },
    {
        name: "Cursos",
        type: "expense",
        icon: "📚"
    },
    {
        name: "Educación",
        type: "expense",
        icon: "🎓"
    },
    {
        name: "Entretenimiento",
        type: "expense",
        icon: "🎬"
    },
    {
        name: "Vestimenta",
        type: "expense",
        icon: "👗"
    },
    {
        name: "Gastos personales",
        type: "expense",
        icon: "🛍️"
    },
    {
        name: "Otros",
        type: "expense",
        icon: "🔧"
    },
    {
        name: "Salud",
        type: "expense",
        icon: "🏥"
    },
    {
        name: "Tarjeta de crédito",
        type: "expense",
        icon: "💳"
    },
    {
        name: "Transporte",
        type: "expense",
        icon: "🚗"
    },
    {
        name: "Vivienda",
        type: "expense",
        icon: "🏠"
    },
    {
        name: "Inversión",
        type: "expense",
        icon: "📊"
    },
    {
        name: "Pago préstamo",
        type: "expense",
        icon: "💵"
    },
    {
        name: "Préstamo realizado",
        type: "expense",
        icon: "🏦"
    },
    {
        name: "Seguro salud",
        type: "expense",
        icon: "🩺"
    },
    {
        name: "Seguro vehícular",
        type: "expense",
        icon: "🚗"
    },
    {
        name: "Fondo inversión",
        type: "expense",
        icon: "📈"
    },
    {
        name: "Pago a colaboradores",
        type: "expense",
        icon: "👥"
    }
];