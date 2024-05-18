/// <reference types="cypress" />

describe("Burger Constructor", () => {
  before(() => {
    // Загружаем страницу конструктора перед тестами
    cy.visit("localhost:3000");
  });

  it("should drag and drop ingredients into the constructor", () => {
    // Ожидаем загрузку элементов
    cy.get('[data-cy="ingredient-bun"]').should("exist");

    // Перетаскиваем булку
    cy.get('[data-cy="ingredient-bun"]').first().trigger("dragstart");
    cy.get('[data-cy="constructor"]').should("exist").trigger("drop");

    // Проверяем, что булка добавлена
    cy.get('[data-cy="constructor-bun-top"]').should("exist");
    cy.get('[data-cy="constructor-bun-bottom"]').should("exist");

    // Перетаскиваем начинку
    cy.get('[data-cy="ingredient-main"]').should("exist");
    cy.get('[data-cy="ingredient-main"]').first().trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingredient-main"]').last().trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");

    // Проверяем, что начинка добавлена
    cy.get('[data-cy="constructor-main"]').should("have.length", 1);

    // Нажимаем на кнопку оформления заказа и попадаем в LoginPage, т.к. не были авторизованы
    cy.get('[data-cy="order-button"]').click();

    // Нажимаем на кнопку Войти
    cy.get('[data-cy="login-button"]').click();

    // Снова нажимаем на кнопку оформления заказа
    cy.get('[data-cy="order-button"]').click();

    // Ждем 16 секунд, чтобы дать загрузиться модальному окну
    cy.wait(16000);

    // Проверяем, что открылось модальное окно
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="order-details"]').should("exist");

    // Проверяем наличие идентификатора заказа
    cy.get('[data-cy="order-id"]').should("not.be.empty");

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should("not.exist");
  });
});
