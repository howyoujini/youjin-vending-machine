import {
  BeverageNotFoundException,
  InsufficientCashForBeverageException,
  InvalidDenominationException,
  NegativeAmountException,
  OutOfStockBeverageException,
} from "@exceptions";
import { beforeEach, describe, expect, it } from "vitest";
import { VendingMachine } from "../models/vendingMachine";

describe("VendingMachine class", () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });

  describe("getInsertedCash method", () => {
    it("should return the initially inserted cash as 0", () => {
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });

    it("should return the correct inserted cash after inserting money", () => {
      vendingMachine.insertCash(1000);
      expect(vendingMachine.getInsertedCash()).toBe(1000);
    });
  });

  describe("insertCash method", () => {
    it("should correctly add valid cash denominations", () => {
      vendingMachine.insertCash(1000);
      vendingMachine.insertCash(500);
      expect(vendingMachine.getInsertedCash()).toBe(1500);
    });

    it("should change the state of the vending machine", () => {
      const initialState = vendingMachine.getState().id;
      vendingMachine.insertCash(1000);
      const afterState = vendingMachine.getState().id;

      expect(initialState).not.toEqual(afterState);
      expect(afterState).toEqual("pending");
    });

    it("should throw InvalidDenominationException for invalid denominations", () => {
      expect(() => vendingMachine.insertCash(1234)).toThrowError(
        InvalidDenominationException
      );
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });

    it("should throw NegativeAmountException for zero cash insertion", () => {
      expect(() => vendingMachine.insertCash(0)).toThrowError(
        NegativeAmountException
      );
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });

    it("should throw NegativeAmountException for negative cash insertion", () => {
      expect(() => vendingMachine.insertCash(-500)).toThrowError(
        NegativeAmountException
      );
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });
  });

  describe("getState method", () => {
    it("should return the initial state as 'on-sale'", () => {
      expect(vendingMachine.getState().id).toBe("on-sale");
    });
  });

  beforeEach(() => {
    vendingMachine.beverages = [
      {
        id: "1",
        isAvailable: true,
        icon: "",
        name: "Coke",
        price: 1000,
        stock: 5,
      },
      {
        id: "2",
        isAvailable: true,
        icon: "",
        name: "Pepsi",
        price: 1500,
        stock: 0,
      },
    ];
  });

  describe("dispenseBeverage method", () => {
    it("should dispense a beverage if all conditions are met", () => {
      vendingMachine.insertCash(1000);
      vendingMachine.insertCash(1000);

      const previousStock = vendingMachine.beverages[0].stock;
      const beverage = vendingMachine.dispenseBeverage(
        vendingMachine.beverages[0].id
      );

      expect(beverage.name).toBe(vendingMachine.beverages[0].name);
      expect(beverage.stock).toBe(previousStock - 1);
      expect(vendingMachine.getInsertedCash()).toBe(1000);
    });

    it("should update vending machine state to sold out when out of stock", () => {
      const initialStock = vendingMachine.beverages[0].stock;

      for (let i = 0; i < initialStock; i++) {
        vendingMachine.insertCash(vendingMachine.beverages[0].price);
        vendingMachine.dispenseBeverage(vendingMachine.beverages[0].id);
      }

      const afterState = vendingMachine.getState().id;

      expect(afterState).toBe("sold-out");
    });

    it("should throw BeverageNotFoundException for invalid beverageId", () => {
      vendingMachine.insertCash(1000);
      vendingMachine.insertCash(1000);

      expect(() => vendingMachine.dispenseBeverage("99")).toThrowError(
        BeverageNotFoundException
      );
    });

    it("should throw OutOfStockBeverageException if beverage is out of stock", () => {
      vendingMachine.insertCash(1000);
      vendingMachine.insertCash(1000);

      expect(() => vendingMachine.dispenseBeverage("2")).toThrowError(
        OutOfStockBeverageException
      );
    });

    it("should throw InsufficientCashForBeverageException if inserted cash is insufficient", () => {
      vendingMachine.insertCash(500);

      expect(() =>
        vendingMachine.dispenseBeverage(vendingMachine.beverages[0].id)
      ).toThrowError(InsufficientCashForBeverageException);
    });
  });

  describe("returnChange method", () => {
    it("should return the total inserted cash and reset it to 0", () => {
      vendingMachine.insertCash(1000);
      vendingMachine.insertCash(500);

      const change = vendingMachine.returnChange();

      expect(change).toBe(1500);
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });

    it("should return 0 if no cash has been inserted", () => {
      const change = vendingMachine.returnChange();

      expect(change).toBe(0);
      expect(vendingMachine.getInsertedCash()).toBe(0);
    });

    it("should change the state of the vending machine after returning change", () => {
      vendingMachine.insertCash(1000);
      const initialState = vendingMachine.getState().id;

      vendingMachine.returnChange();
      const afterState = vendingMachine.getState().id;

      expect(initialState).not.toEqual(afterState);
      expect(afterState).toBe("on-sale");
    });
  });
});
