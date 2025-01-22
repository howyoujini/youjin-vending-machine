import {
  InvalidDenominationException,
  NegativeAmountException,
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
});
