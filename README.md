# Проектная работа "Веб-ларек"

Веб-ларек - это современный интернет-магазин, специализирующийся на товарах для веб-разработчиков. Проект представляет собой полнофункциональное SPA-приложение с каталогом товаров, корзиной покупок и многошаговым оформлением заказа.

Главная особенность: строгая **архитектура MVP + Event Bus**, где модели, представления и сервисы взаимодействуют через события. Это повышает читаемость, тестируемость и расширяемость проекта.


#### Стек: HTML, SCSS, TS, Webpack

#### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/types/ — папка с типизацией компанентов
- src/types/base/ — папка с базовыми типами и основными сущностями
- src/types/model/ — папка с типизацией компонентов модели проекта
- src/types/view/ — папка с типизацией компонентов отображения проекта

#### Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта

- Model — реактивные модели данных (ProductModel, BasketModel, OrderModel)
- View — компоненты отображения (карточки, списки, модалки)
- Presenter — контроллер, точка входа (index.ts)
- Service (API) — классы для HTTP-запросов
- Event Bus — слабосвязанная система событий для взаимодействия компонентов

Взаимодействие через события:

1. Модели генерируют события при изменении состояния
2. Слушатели в презентере обрабатывают данные и обновляют view
3. View вызывает события по действиям пользователя

## Базовые типы и классы (src/types/base/)
### Класс ```Api```
**Назначение:**

Базовый HTTP-клиент, инкапсулирующий логику сетевых запросов и обработку ответов сервера.
Используется как родительский класс для всех сервисов, работающих с API.

**Конструктор**

```constructor(baseUrl: string, options: RequestInit = {})```

**Параметры конструктора:**
- baseUrl: string — базовый URL сервера
- options: RequestInit — глобальные опции для всех запросов (заголовки, credentials и т.д.)

**Поля**
- baseUrl: string
- options: RequestInit

**Методы**
- ```get<T>(uri: string): Promise<T>``` — GET-запрос
- ```post<T>(uri: string, data: unknown, method?: ApiPostMethods): Promise<T>``` - Выполняет POST / PUT / DELETE запросы в зависимости от метода
- ```handleResponse<T>(response: Response): Promise<T>``` - Проверяет валидность ответа сервера и преобразует его в JSON. Выбрасывает ошибку при некорректном статусе ответа

**Перечисление ```ApiPostMethods```**

Используется в методе post базового класса Api.

POST | PUT | DELETE

Позволяет избежать использования строковых литералов для HTTP-методов.

### ```ErrorState```
**Назначение:**
Тип состояния ошибки, используемый в моделях данных и презентере.

```
{
  error: string | null;
}
```

**Используется:**
- для хранения текста ошибки
- для отображения ошибок во view

### Событийная система (Event Bus)

В проекте реализован Event Bus с типизацией через ```EventMap``` и ```TypedEvents```. Это позволяет безопасно работать с событиями и данными между компонентами без жёсткой связки.

```AppEvents``` - перечисление всех событий, которыми общаются:
- модели
- view-компоненты
- контроллер


Также обеспечивает слабую связанность между частями приложения.

Товар:

- PRODUCTS_LOADED - событие загрузки товаров с сервера.
- PRODUCT_SELECTED - событие, отображающее, что товар выбран и открыта модалка этого товара.
- PRODUCT_ADD_TO_BASKET - событие добавление товара в корзину.
- PRODUCT_REMOVE_FROM_BASKET - событие удаление товара из корзины.

Корзина:
- BASKET_OPEN - событие, отображающее, что модалка корзины открыта.

Заказ:
- ORDER_START - начало оформления заказа.
- ORDER_PAYMENT_SET - шаг заполнения платежной информации в заказе (1 шаг).
- ORDER_CONTACTS_SET - шаг заполнения контактной информации в заказе (2 шаг).
- ORDER_SUCCESS - событие успешного оформления заказа.
- ORDER_STEP_CHANGE - переключает модальные окна шагов оплаты.

Модалки:
- MODAL_OPEN - открывает конкретное модальное окно.
- MODAL_CLOSE - закрывает конкретное модальное окно

```EventMap```

EventMap описывает структуру данных для каждого события. Это позволяет TypeScript проверять, что при вызове emit и подписке on передаются корректные данные.

```ModalData``` - тип передаваемых данных при открытии любой модалки.

Параметры открываемой модалки:
- ```type: "product" | "basket" | "order" | "success"``` - какой модалке открыться (в зависимости от события).
- ```data?: unknown``` - что показать (товар, корзина, заказ).

```OrderData``` - используется при переходах между шагами оформления заказа.

Содержит:
- текущий объект заказа
- шаг: payment, contacts, success

Позволяет:
- переключать UI
- валидировать шаги

### Типы данных доменной модели (DataTypes.ts)
```IProduct``` - описание товара, приходящего с API и отображаемого пользователю.

Используется в:
- каталоге
- карточках товара
- модалке товара
- корзине

Товар:
- id - уникальный идентификатор для поиска и действий
- title - имя товара
- description - подробное описание в модалке
- image - ссылка на изображение
- category - нужен для отображения категории товара
- price - отображение суммы, расчёт итоговой цены в корзине

```IBasketItem``` - единица товара в корзине(для удобного разделения товара в корзине от его отображения на главной старнице).

Элемент корзины:
- product: IProduct

```PaymentSettings``` - данные первого шага оформления заказа.

Шаг 1 — способ оплаты:
- ```payment: "online" | "upon receipt"``` - выбранный способ оплаты
- ```address: string``` - адрес доставки

```PaymentContacts``` - данные второго шага оформления.

Шаг 2 — контакты:
- email: string
- phone: string

Используется:
- для валидации перед оплатой
- в createOrder()

```OrderSettings``` - объединение данных двух шагов в единый объект.

```typescript
{
  paymentSettings: PaymentSettings;
  paymentContacts: PaymentContacts;
}
```

```Order``` - полное описание заказа, которое уходит на сервер.

Общий объект заказа:
- items - список товаров
- totalPrice - итоговая цена
- OrderSettings - данные обоих шагов оформления


## Базовые интерфейсы моделей (Model.ts)
```IModel<T>``` - базовый интерфейс реактивной модели, которую можно слушать.

Используется всеми моделями:
- ProductModel
- BasketModel
- OrderModel

Методы:
- getState(): T — возвращает текущее состояние модели.
- setState(newState: T): void — устанавливает новое состояние и вызывает всех слушателей.
- addChangeListener(cb) — позволяет view подписаться на изменения модели.
- removeChangeListener(cb) — прекращает отслеживать модель.
- emitChange(): void - механизм уведомления подписчиков, что состояние изменилось.


## Классы моделей данных
### Класс ```ProductModel```

**Назначение:**
Хранит список товаров, состояние загрузки и ошибки

**Конструктор**

```constructor()```

**Методы**
- ```setProducts(products: IProduct[]): void``` — устанавливает каталог
- ```setLoading(loading: boolean): void``` — показывает пользователю, что данные загружаются
- ```setError(error: string): void``` - хранить ошибку загрузки/сервера в state, чтобы view могла её отобразить
- ```getProductById(id: string): IProduct | undefined``` - предоставляет доступ к товарам по ID


### Класс ```BasketModel```

**Назначение:**
Хранит товары корзины, общую цену и количество

**Конструктор**

```constructor()```

**Методы**
- ```addProduct(product: IProduct): void``` - добавляет товары в корзину
- ```removeProduct(productId: string): void``` - удаляет товары из корзины по айди
- ```getTotalPrice(): number``` - вычисляет общую стоимость
- ```getItemCount(): number``` - вычисляет общее количетсво предметов
- ```isEmpty(): boolean``` - проверяет состояние корзины

### Класс ```OrderModel```

**Назначение:**
Хранит данные оформления заказа между шагами.

**Конструктор**

```constructor()```

**Методы**
- ```setStep(step: OrderStep): void``` - задает шаг формления заказа
- ```setPaymentSettings(settings: PaymentSettings): void``` - сохраняет данные первого шага
- ```setContacts(contacts: PaymentContacts): void``` - сохраняет данные второго шага
- ```setItems(items: IBasketItem[]): void``` - сохраняет товары в заказе
- ```getOrderData(): Order```
- ```validatePayment(): boolean``` - проверяет:
  - заполнен ли адрес
  - выбран ли метод оплаты
- ```validateContacts(): boolean``` - проверяет:
  - корректо заполнен email
  - корректо заполнен номер
- ```reset()``` -  сбрасывает данные заказа после успешного оформления
Не отправляет заказ на сервер

## API-сервисы
### Класс ```ApiService extends Api```
**Назначение:**
Сервисный слой для работы с бизнес-данными приложения.

**Параметры конструктора:**
- baseUrl: string — базовый URL сервера
- options: RequestInit — глобальные опции для всех запросов (заголовки, credentials и т.д.)

**Методы**
- ```getProducts(): Promise<IProduct[]>```
- ```getProductById(id: string): Promise<IProduct>```
- ```createOrder(order: Order): Promise<OrderResponse>```

Используется исключительно в **презентере**
Модели не знают о существовании этого класса

## Элементы представления (View)
### Базовый класс Component
**Назначение:**

Общий базовый класс для всех UI-компонентов приложения. Инкапсулирует работу с DOM-элементом и повторяющиеся операции.

**Конструктор**

```constructor(element: HTMLElement)```

**Поля**
- element: HTMLElement — корневой DOM-элемент компонента

**Методы**
- ```show(): void``` — показывает элемент
- ```hide(): void``` — скрывает элемент
- ```setText(text: string): void``` — устанавливает текстовое содержимое
- ```setDisabled(disabled: boolean): void``` — включает/выключает элемент
- ```toggleClass(className: string, state: boolean): void``` — управляет CSS-классами

### Базовые интерфейсы представлений

```IView``` - базовый интерфейс для всех UI-компонентов.

- ```element: HTMLElement``` - DOM-узел
- ```render(): HTMLElement``` - обновляет внешний вид view

```IDataView<T>``` - универсальный интерфейс для рендеринга данных модели.

- ```update(data: Partial<T>): HTMLElement``` - обновляет переданные данные на основе модели (товар, корзина, заказ)

Используется для карточек, списков, модалок.

```IModal``` - общий интерфейс всех модальных окон.

Свойства:
- closeButton: HTMLButtonElement - кнопка закрытия модалки, которая есть во всех окнах
- content?: HTMLElement - контент модалки

Методы:
- open() - показывает модалку
- close() - скрывает модалку
- isOpen(): boolean - проверяет состояние

```IList``` - отображение массивов данных. Переиспользуемый список для каталога и корзины.


Методы:
- update(elements: Partial<HTMLElement[]>): HTMLElement;
- render(): HTMLElement;

### Конкретные классы представления
```ProductListView```
- принимает DOM-элемент в конструкторе
- подписывается на клики
- рендерит список товаров

**Конструктор**

```constructor(container: HTMLElement)```

**Параметры конструктора**
- container: HTMLElement — DOM-элемент, в котором отображается каталог

**Методы**
- ```setElements(elements: HTMLElement[]): void``` — рендерит каталог

```ProductCardView```

**Назначение:**

Отображает отдельный товар в каталоге.

**Конструктор**

```constructor(template: HTMLTemplateElement)```

**Параметры**
- product: IProduct - объект продукта
- categoryElement: HTMLElement - категрия продукта
- titleElement: HTMLElement - название продукта
- imageElement: HTMLImageElement - фото продукта
- priceElement: HTMLElement - цена продукта

**Методы**
- ```setProduct(product: IProduct): void```
- ```update(data: Partial<IProduct>): HTMLElement```
- ```getId(): string```
- ```getProduct(): IProduct```

```ProductModal```

**Назначение:**

Отображает подробную информацию о товаре в модальном окне.

Наследует ```Modal``` и реализует ```IDataView<IProduct>```.

**Конструктор**

```constructor(element: HTMLElement, private template: HTMLTemplateElement)```

**Методы**
- ```setProduct(product: IProduct): void``` - показать данные товара в модалке
- ```setInBasket(isInBasket: boolean): void``` - проверка, есть ли товар в корзине, для корректного отображения кнопки "Добавить в корзину"
- ```onAddToBasket(cb): void``` - рекция на клик по кнопке "Добавить в корзину"
- ```onRemoveFromBasket(cb): void``` - рекция на клик по кнопке "Удалить из корзины"

```BasketListView```

**Назначение:**

Отображает список товаров в корзине.

**Конструктор**

```constructor(container: HTMLElement)```


**Методы**
- ```setElements(elements: HTMLElement[]): void``` - рендер

```BasketModal```

**Назначение:**

Модальное окно корзины. Отображает список товаров, итоговую сумму и кнопку перехода к оформлению заказа.

**Конструктор**

```constructor(
  element: HTMLElement,
		private basketTemplate: HTMLTemplateElement
)
```

**Параметры конструктора**
- listView: BasketListView - лист товаров в корзине
- totalPriceElement: HTMLElement - общая сумма товаров в корзине
- submitButton: HTMLButtonElement - кнопки отправки формы, начала оформления заказа

**Методы**
- ```updateBasket(items: IBasketItem[]): void``` - обновить отображение корзны

```OrderModal```

**Назначение:**

Отображает пошаговое оформление заказа:
1. выбор способа оплаты и ввод адреса
2. ввод контактных данных

**Конструктор**

```constructor(
  modalElement: HTMLElement,
  orderTemplate: HTMLTemplateElement,
  contactsTemplate: HTMLTemplateElement,
)
```

**Методы**
- ```setStep(step: 'payment' | 'contacts'): void``` - переключить шаг оформления
- ```setPaymentData(data: PaymentSettings & { valid?: boolean; errors?: string[] }): void``` - заполнить и валидационно обновить UI шага 1
- ```setContactsData(data: PaymentContacts & { valid?: boolean; errors?: string[] }): void``` - заполнить и валидационно обновить UI шага 2
- ```setValid(value: boolean): void``` - блокирует или разблокирует кнопку отправки формы
- ```onPaymentChange(cb): void``` - обработчик изменения данных формы оплаты
- ```onContactsChange(cb): void``` - обработчик изменения контактных данных
- ```onNextStep(cb): void``` - обработчик перехода к следующему шагу
- ```onSubmit(cb): void``` - обработчик отправки заказа

```SuccessModal```

**Назначение:**

Отдельное модальное окно, отображающее сообщение об успешном оформлении заказа. Отвечает только за отображение результата операции.

Наследует базовый класс Modal.

**Конструктор**

```
constructor(
  element: HTMLElement,
  template: HTMLTemplateElement
)
```

**Методы**

```showSuccess(total: number): void```
— отображает окно успешного заказа
— выводит сумму списанных средств

```render(): HTMLElement```
— возвращает корневой DOM-элемент модального окна

```HeaderView```

**Назначение:**

Отображает шапку сайта с кнопкой корзины и счётчиком количества товаров. Компонент инкапсулирует работу с DOM-элементами шапки и обеспечивает реакцию на клик по корзине.

**Конструктор**

```constructor(container: HTMLElement)```

**Поля:**
- basketButton — кнопка корзины в шапке.
- basketCounter — элемент, отображающий количество товаров в корзине.
- basketClickCb — коллбэк на клик по кнопке корзины.

**Методы:**
- ```setCounter(count: number): void``` — обновляет отображаемое количество товаров в корзине.
- ```onBasketClick(callback: () => void): void``` — задаёт обработчик клика по корзине.
- ```render(): HTMLElement``` — возвращает корневой DOM-элемент компонента.

## Взаимодействие всех типов между собой

### Загрузка товаров
1. index.ts → ApiService.getProducts()
2. данные → ProductModel.setProducts
3. событие PRODUCTS_LOADED
4. ProductListView.render

### Оформление заказа
1. BasketModel → товары
2. OrderModel.setPaymentSettings
3. OrderModel.setContacts
4. ApiService.createOrder
5. Presenter открывает SuccessModal
5. BasketModel.clear
6. OrderModel.reset

### Просмотр товара
1. Клик на карточку → PRODUCT_SELECTED
2. Презентер получает товар из ProductModel
3. Открытие ProductModal

### Добавление товара в корзину
1. Клик "Добавить" → PRODUCT_ADD_TO_BASKET
2. BasketModel.addProduct()
3. Генерация BASKET_UPDATE
5. Обновляются:
- Header
- BasketModal
- BasketListView