import { beforeEach, describe, expect, it } from "vitest";
import {
  InsufficientCashException,
  NegativeAmountException,
} from "../exceptions";
import { User } from "../models/user";

describe("User class", () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  describe("resetPaymentMethod method", () => {
    it("should reset payment method to 'none'", () => {
      user.payWithCard();
      expect(user.getPaymentMethod()).toBe("card");

      user.resetPaymentMethod();
      expect(user.getPaymentMethod()).toBe("none");
    });
  });

  describe("payWithCash method", () => {
    it("should decrease cash balance by the specified amount", () => {
      user.payWithCash(1000);
      expect(user.getTotalCash()).toBe(29000);
    });

    it("should set payment method to 'cash'", () => {
      user.payWithCash(1000);
      expect(user.getPaymentMethod()).toBe("cash");
    });

    it("should throw NegativeAmountException if the amount is zero or negative", () => {
      expect(() => user.payWithCash(0)).toThrowError(NegativeAmountException);
      expect(() => user.payWithCash(-1000)).toThrowError(
        NegativeAmountException
      );
    });

    it("should throw InsufficientCashException if the amount exceeds the current balance", () => {
      expect(() => user.payWithCash(40000)).toThrowError(
        InsufficientCashException
      );
    });
  });

  describe("haveCashesBack method", () => {
    it("should increase cash balance by the specified amount", () => {
      user.haveCashesBack(5000);
      expect(user.getTotalCash()).toBe(35000);
    });

    it("should throw NegativeAmountException if the amount is negative", () => {
      expect(() => user.haveCashesBack(-5000)).toThrowError(
        NegativeAmountException
      );
    });
  });

  describe("payWithCard method", () => {
    it("should set payment method to 'card'", () => {
      user.payWithCard();
      expect(user.getPaymentMethod()).toBe("card");
    });
  });

  describe("getTotalCash method", () => {
    it("should return the current cash balance", () => {
      expect(user.getTotalCash()).toBe(30000);

      user.payWithCash(2000);
      expect(user.getTotalCash()).toBe(28000);
    });
  });

  describe("getPaymentMethod method", () => {
    it("should return the current payment method", () => {
      expect(user.getPaymentMethod()).toBe("none");

      user.payWithCash(1000);
      expect(user.getPaymentMethod()).toBe("cash");

      user.payWithCard();
      expect(user.getPaymentMethod()).toBe("card");
    });
  });
});
