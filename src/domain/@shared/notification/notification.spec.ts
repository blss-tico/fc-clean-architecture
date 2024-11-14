import Notification from "./notification";

describe("Unit testss for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.messages("customer")).toBe(
      "customer: error message,"
    );

    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    const error3 = {
      message: "error message3",
      context: "order",
    };
    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    expect(notification.messages()).toBe(
      "customer: error message,customer: error message2,order: error message3,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });

  it("should get error for product", () => {
    const notification = new Notification();
    
    const error = {
      message: "error message",
      context: "product",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
    expect(notification.getErrors()).toEqual([error]);
    expect(notification.messages("product")).toBe(
      "product: error message,"
    );
  });

  it("should get two errors for product", () => {
    const notification = new Notification();
    
    const error = {
      message: "error message1",
      context: "product",
    };
    notification.addError(error);

    const error2 = {
      message: "error message2",
      context: "product",
    };
    notification.addError(error2);

    expect(notification.hasErrors()).toBe(true);
    expect(notification.getErrors()).toHaveLength(2);
    expect(notification.messages("product")).toBe(
      "product: error message1,product: error message2,"
    );
  });

});
