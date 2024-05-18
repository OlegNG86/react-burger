/// <reference types="cypress" />

// Константы для селекторов
const SELECTORS = {
  ingredientBun: '[data-cy="ingredient-bun"]',
  ingredientMain: '[data-cy="ingredient-main"]',
  constructor: '[data-cy="constructor"]',
  constructorBunTop: '[data-cy="constructor-bun-top"]',
  constructorBunBottom: '[data-cy="constructor-bun-bottom"]',
  constructorMain: '[data-cy="constructor-main"]',
  orderButton: '[data-cy="order-button"]',
  modal: '[data-cy="modal"]',
  orderDetails: '[data-cy="order-details"]',
  orderId: '[data-cy="order-id"]',
  modalCloseButton: '[data-cy="modal-close-button"]',
  loginButton: '[data-cy="login-button"]',
};

describe("Burger Constructor", () => {
  before(() => {
    // Загружаем страницу конструктора перед тестами
    cy.visit("/");
  });

  it("should drag and drop ingredients into the constructor and create an order and show modal with order details", () => {
    // Ожидаем загрузку элементов
    cy.get(SELECTORS.ingredientBun).should("exist");

    // Перетаскиваем булку
    cy.get(SELECTORS.ingredientBun).first().trigger("dragstart");
    cy.get(SELECTORS.constructor).should("exist").trigger("drop");

    // Проверяем, что булка добавлена
    cy.get(SELECTORS.constructorBunTop).should("exist");
    cy.get(SELECTORS.constructorBunBottom).should("exist");

    // Перетаскиваем начинку
    cy.get(SELECTORS.ingredientMain).should("exist");
    cy.get(SELECTORS.ingredientMain).first().trigger("dragstart");
    cy.get(SELECTORS.constructor).trigger("drop");
    cy.get(SELECTORS.ingredientMain).last().trigger("dragstart");
    cy.get(SELECTORS.constructor).trigger("drop");

    // Проверяем, что начинка добавлена
    cy.get(SELECTORS.constructorMain).should("have.length", 1);

    // Нажимаем на кнопку оформления заказа и попадаем в LoginPage, т.к. не были авторизованы
    cy.get(SELECTORS.orderButton).click();

    // Нажимаем на кнопку Войти
    cy.get(SELECTORS.loginButton).click();

    // Снова нажимаем на кнопку оформления заказа
    cy.get(SELECTORS.orderButton).click();

    // Ждем 16 секунд, чтобы дать загрузиться модальному окну
    cy.wait(16000);

    // Проверяем, что открылось модальное окно
    cy.get(SELECTORS.modal).should("exist");
    cy.get(SELECTORS.orderDetails).should("exist");

    // Проверяем наличие идентификатора заказа
    cy.get(SELECTORS.orderId).should("not.be.empty");

    // Закрываем модальное окно
    cy.get(SELECTORS.modalCloseButton).click();

    // Проверяем, что модальное окно закрыто
    cy.get(SELECTORS.modal).should("not.exist");
  });
});
