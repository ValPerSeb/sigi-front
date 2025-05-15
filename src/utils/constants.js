export const SEARCH_BY_OPTIONS = {
    products: [
        {value: 'ProductId', label: 'ID'},
        {value: 'ProductName', label: 'Nombre'},
        {value: 'CategoryId', label: 'Categoría'},
        {value: 'SupplierId', label: 'Proveedor'},
        {value: 'InventoryLocationId', label: 'Ubicación de inventario'}
    ],
    companies: [
        {value: 'CompanyId', label: 'ID'},
        {value: 'CompanyName', label: 'Nombre'},
        {value: 'Nit', label: 'Nit'}
    ],
    categories: [
        {value: 'CategoryId', label: 'ID'},
        {value: 'CategoryName', label: 'Nombre'},
        {value: 'CategoryColor', label: 'Color'}
    ],
    inventoryLocations: [
        {value: 'InventoryLocationId', label: 'ID'},
        {value: 'LocationCode', label: 'Código'},
        {value: 'LocationName', label: 'Nombre'},
        {value: 'IsActive', label: 'Activo/Inactivo'}
    ],
    stockTransactions: [
        {value: 'TransactionId', label: 'ID'},
        {value: 'TransactionType', label: 'Tipo'},
        {value: 'UserName', label: 'Usuario'},
        {value: 'ProductName', label: 'Producto'}
    ],
    suppliers: [
        {value: 'SupplierId', label: 'ID'},
        {value: 'Name', label: 'Nombre'}
    ]
}

