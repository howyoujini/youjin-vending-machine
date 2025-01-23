import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionController } from "../../controller/transaction";
import { CustomBusinessException } from "../../exceptions";
import { Beverage } from "../../models/beverage";
import { User } from "../../models/user";
import { VendingMachine } from "../../models/vendingMachine";
import { displayMessageUI } from "../../ui/displayMessageUI";

vi.mock("../../ui", () => ({
  updateUI: vi.fn(),
}));

vi.mock("../../ui/displayMessageUI", () => ({
  displayMessageUI: vi.fn(),
}));

vi.mock("../../ui/resetMessageUI", () => ({
  resetMessageUI: vi.fn(),
}));

describe("TransactionController", () => {
  let user: User;
  let vendingMachine: VendingMachine;
  let transactionController: TransactionController;

  beforeEach(() => {
    user = new User();
    vendingMachine = new VendingMachine();
    transactionController = new TransactionController(user, vendingMachine);

    vi.clearAllMocks();
  });

  it("should select a beverage and dispense it", () => {
    const beverage = {
      id: "bev1",
      isAvailable: true,
      icon: "",
      name: "Cola",
      price: 1000,
      stock: 5,
    };

    vendingMachine.beverages = [beverage as Beverage];
    vendingMachine.dispenseBeverage = vi.fn();
    user.getPaymentMethod = vi.fn().mockReturnValue("cash");

    transactionController.selectBeverage("bev1");

    expect(vendingMachine.dispenseBeverage).toHaveBeenCalledWith("bev1");
  });

  it("should handle cash payment", () => {
    user.payWithCash = vi.fn();
    vendingMachine.insertCash = vi.fn();

    transactionController.purchaseWithCash(10000);

    expect(user.payWithCash).toHaveBeenCalledWith(10000);
    expect(vendingMachine.insertCash).toHaveBeenCalledWith(10000);
  });

  it("should handle card payment and return change", () => {
    user.payWithCard = vi.fn();
    user.haveCashesBack = vi.fn();
    vendingMachine.setPaymentMethod = vi.fn();
    vendingMachine.returnChange = vi.fn().mockReturnValue(500);

    transactionController.purchaseWithCard();

    expect(user.payWithCard).toHaveBeenCalled();
    expect(vendingMachine.setPaymentMethod).toHaveBeenCalledWith(
      user.getPaymentMethod()
    );
    expect(user.haveCashesBack).toHaveBeenCalledWith(500);
  });

  it("should reset payment method", () => {
    user.resetPaymentMethod = vi.fn();
    vendingMachine.setPaymentMethod = vi.fn();

    transactionController.resetPaymentMethod();

    expect(user.resetPaymentMethod).toHaveBeenCalled();
    expect(vendingMachine.setPaymentMethod).toHaveBeenCalledWith("none");
  });

  it("should return change from the machine", () => {
    user.haveCashesBack = vi.fn();
    vendingMachine.returnChange = vi.fn().mockReturnValue(200);

    transactionController.returnChangeFromMachine();

    expect(vendingMachine.returnChange).toHaveBeenCalled();
    expect(user.haveCashesBack).toHaveBeenCalledWith(200);
  });

  it("should get machine state", () => {
    vendingMachine.getState = vi.fn().mockReturnValue("READY");

    const state = transactionController.getMachineState();

    expect(state).toBe("READY");
    expect(vendingMachine.getState).toHaveBeenCalled();
  });

  it("should get user cash", () => {
    user.getTotalCash = vi.fn().mockReturnValue(1000);

    const cash = transactionController.getUserCash();

    expect(cash).toBe(1000);
    expect(user.getTotalCash).toHaveBeenCalled();
  });

  it("should get inserted cash", () => {
    vendingMachine.getInsertedCash = vi.fn().mockReturnValue(500);

    const insertedCash = transactionController.getInsertedCash();

    expect(insertedCash).toBe(500);
    expect(vendingMachine.getInsertedCash).toHaveBeenCalled();
  });

  it("should display an error message when an exception occurs", () => {
    const mockError = new CustomBusinessException("Test error");
    user.payWithCash = vi.fn(() => {
      throw mockError;
    });

    transactionController.purchaseWithCash(100);

    expect(displayMessageUI).toHaveBeenCalledWith("Test error");
  });
});
