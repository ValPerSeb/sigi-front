import { createCRUDService } from "./api";

export const categoryService = createCRUDService("category");
export const companyService = createCRUDService("company");
export const contactInfoService = createCRUDService("contact-info");
export const inventoryLocationService = createCRUDService("inventory-location");
export const locationService = createCRUDService("location");
export const productService = createCRUDService("product");
export const stockTransactionService = createCRUDService("stock-transaction");
export const supplierService = createCRUDService("supplier");
export const userService = createCRUDService("user");