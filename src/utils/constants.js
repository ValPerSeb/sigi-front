export const SEARCH_BY_OPTIONS = {
    products: [
        {value: 'Id', label: 'ID'},
        {value: 'ProductName', label: 'Nombre'},
        {value: 'CategoryId', label: 'Categoría'},
        {value: 'SupplierId', label: 'Proveedor'},
        {value: 'InventoryLocationId', label: 'Ubicación de inventario'}
    ],
    companies: [
        {value: 'Id', label: 'ID'},
        {value: 'CompanyName', label: 'Nombre'},
        {value: 'Nit', label: 'Nit'}
    ],
    categories: [
        {value: 'Id', label: 'ID'},
        {value: 'CategoryName', label: 'Nombre'},
        {value: 'CategoryColor', label: 'Color'}
    ],
    inventoryLocations: [
        {value: 'Id', label: 'ID'},
        {value: 'LocationCode', label: 'Código'},
        {value: 'LocationName', label: 'Nombre'},
        {value: 'IsActive', label: 'Activo/Inactivo'}
    ],
    stockTransactions: [
        {value: 'Id', label: 'ID'},
        {value: 'Type', label: 'Tipo'},
        {value: 'UserId', label: 'Usuario'},
        {value: 'ProductId', label: 'Producto'}
    ],
    suppliers: [
        {value: 'Id', label: 'ID'},
        {value: 'SupplierName', label: 'Nombre'}
    ],
    users: [
        {value: 'Id', label: 'ID'},
        {value: 'UserName', label: 'Nombre'},
        {value: 'Rol', label: 'Rol'}
    ]
}

