describe("ObjectContaining", function() {

  it("matches any actual to an empty object", function() {
    var containing = new j$.ObjectContaining({});

    expect(containing.asymmetricMatch("foo")).toBe(true);
  });

  it("does not match an empty object actual", function() {
    var containing = new j$.ObjectContaining("foo");

    expect(function() {
      containing.asymmetricMatch({})
    }).toThrowError(/not 'foo'/)
  });

  it("matches when the key/value pair is present in the actual", function() {
    var containing = new j$.ObjectContaining({foo: "fooVal"});

    expect(containing.asymmetricMatch({foo: "fooVal", bar: "barVal"})).toBe(true);
  });

  it("does not match when the key/value pair is not present in the actual", function() {
    var containing = new j$.ObjectContaining({foo: "fooVal"});

    expect(containing.asymmetricMatch({bar: "barVal", quux: "quuxVal"})).toBe(false);
  });

  it("does not match when the key is present but the value is different in the actual", function() {
    var containing = new j$.ObjectContaining({foo: "other"});

    expect(containing.asymmetricMatch({foo: "fooVal", bar: "barVal"})).toBe(false);
  });

  it("jasmineToString's itself", function() {
    var containing = new j$.ObjectContaining({});

    expect(containing.jasmineToString()).toMatch("<jasmine.objectContaining");
  });

  it("matches recursively", function() {
    var containing = new j$.ObjectContaining({one: new j$.ObjectContaining({two: {}})});

    expect(containing.asymmetricMatch({one: {two: {}}})).toBe(true);
  });

  it("matches when key is present with undefined value", function() {
    var containing = new j$.ObjectContaining({ one: undefined });

    expect(containing.asymmetricMatch({ one: undefined })).toBe(true);
  });

  it("does not match when key with undefined value is not present", function() {
    var containing = new j$.ObjectContaining({ one: undefined });

    expect(containing.asymmetricMatch({})).toBe(false);
  });
});
