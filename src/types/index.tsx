export interface UserType {
    _id: string
    userId: string
    firstName: string
    lastName: string
    middleName: string
    email: string
    addedOn: string
    role: string
    mobileNumber: string
}
export interface CategoryType {
    _id: string
    name: string
    categoryId: string
    addedBy: UserType
    addedOn: string
}

export interface ProductType {
    _id: string
    productId: string
    name: string
    category: CategoryType
    addedBy: UserType
    addedOn: string
}


export interface BusinessType {
    _id: string
    regId: string
    name: string
    cacId: string
    owner: UserType
    address: string
    addedBy: UserType
    addedOn: string
}

export interface OperationType {
    _id: string
    operationId: string
    description: string
    category: CategoryType
    runBy: BusinessType
    addedBy: UserType
    contactNumbers: Array<string>
    locations: Array<string>
    products: Array<OperationProductType>
    addedOn: string
    mediaURLs: Array<string>
}

export interface OperationProductType {
    _id: string
    opProductId: string
    product: ProductType
    operation: OperationType
    description: string
    size: string
    netProductionCapacity: string
    costs: Array<string>
    availableQuantity: string
    addedBy: UserType
    addedOn: string
    lastEdited: string
}