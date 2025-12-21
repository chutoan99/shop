export enum ModePopup {
	Create,
	Update
}

export enum TypeConfig {
	Manual,
	Reference
}

export enum TypeSelect {
	Select,
	MultipleSelect
}

export enum DisplayValueSelectType {
	Select,
	Check
}

export enum OptionNumber {
	Int,
	Float,
	Percent
}

export enum LogicCompares {
	AND,
	OR,
	CUSTOM
}

export enum TypeCompare {
	TEXT,
	NUMBER,
	SELECT,
	DATE,
	BOOLEAN
}

export enum ComparisonOperator {
	EQUAL, // bằng
	NOT_EQUAL, // không bằng
	GREATER_THAN, // Lớn hơn
	LESS_THAN, // nhỏ hơn
	GREATER_THAN_OR_EQUAL, // lớn hơn hoặc bằng
	LESS_THAN_OR_EQUAL, // nhỏ hơn hoặc bằng
	EMPTY, // trống
	NOT_EMPTY, // không trống
	BETWEEN, // nằm giữa
	NOT_BETWEEN, // không nằm giữa
	RANGE, // thuộc khoảng
	NOT_RANGE, // không thuộc khoảng
	EXACTLY, // là
	NOT_EXACTLY, // không là
	BEFORE, // trước
	AFTER, //sau
	COMPARE_TODAY, // So với ngày hôm nay
	CONTAINS, // chứa
	NOT_CONTAINS, // không chứa
	STARTS_WITH, // bắt đầu với
	ENDS_WITH, //
	IN, // thuộc một trong
	NOT_IN // không thuộc một trong
}

export enum DecimalPlaces {
	NoDecimal,
	OneDecimal,
	TwoDecimals,
	ThreeDecimals,
	FourDecimals,
	FiveDecimals,
	SixDecimals
}
