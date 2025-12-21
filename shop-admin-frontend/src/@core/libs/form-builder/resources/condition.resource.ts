import { IComparison } from '../interfaces'
import { ComparisonOperator } from './enum.resource'

export const NUMBER_CONDITION: ReadonlyMap<ComparisonOperator, IComparison> = new Map([
	[
		ComparisonOperator.EQUAL,
		{
			Display: '=',
			Type: ComparisonOperator.EQUAL,
			Label: 'Equal',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EQUAL,
		{
			Display: '≠',
			Type: ComparisonOperator.NOT_EQUAL,
			Label: 'Not Equal',
			Disable: false
		}
	],
	[
		ComparisonOperator.GREATER_THAN,
		{
			Display: '>',
			Type: ComparisonOperator.GREATER_THAN,
			Label: 'Greater Than',
			Disable: false
		}
	],
	[
		ComparisonOperator.LESS_THAN,
		{
			Display: '<',
			Type: ComparisonOperator.LESS_THAN,
			Label: 'Less Than',
			Disable: false
		}
	],
	[
		ComparisonOperator.GREATER_THAN_OR_EQUAL,
		{
			Display: '≥',
			Type: ComparisonOperator.GREATER_THAN_OR_EQUAL,
			Label: 'Greater Than or Equal',
			Disable: false
		}
	],
	[
		ComparisonOperator.LESS_THAN_OR_EQUAL,
		{
			Display: '≤',
			Type: ComparisonOperator.LESS_THAN_OR_EQUAL,
			Label: 'Less Than or Equal',
			Disable: false
		}
	],
	[
		ComparisonOperator.EMPTY,
		{
			Display: 'Empty',
			Type: ComparisonOperator.EMPTY,
			Label: 'Empty',
			Disable: true
		}
	],
	[
		ComparisonOperator.NOT_EMPTY,
		{
			Display: 'Not Empty',
			Type: ComparisonOperator.NOT_EMPTY,
			Label: 'Not Empty',
			Disable: true
		}
	],
	[
		ComparisonOperator.BETWEEN,
		{
			Display: 'Between',
			Type: ComparisonOperator.BETWEEN,
			Label: 'Between',
			Disable: true
		}
	],
	[
		ComparisonOperator.NOT_BETWEEN,
		{
			Display: 'Not Between',
			Type: ComparisonOperator.NOT_BETWEEN,
			Label: 'Not Between',
			Disable: true
		}
	]
])

export const DATE_CONDITION: ReadonlyMap<ComparisonOperator, IComparison> = new Map([
	[
		ComparisonOperator.EMPTY,
		{
			Display: 'Empty',
			Type: ComparisonOperator.EMPTY,
			Label: 'Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EMPTY,
		{
			Display: 'Not Empty',
			Type: ComparisonOperator.NOT_EMPTY,
			Label: 'Not Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.RANGE,
		{
			Display: 'In Range',
			Type: ComparisonOperator.RANGE,
			Label: 'In Range',
			Disable: true
		}
	],
	[
		ComparisonOperator.NOT_RANGE,
		{
			Display: 'Not In Range',
			Type: ComparisonOperator.NOT_RANGE,
			Label: 'Not In Range',
			Disable: true
		}
	],
	[
		ComparisonOperator.EXACTLY,
		{
			Display: 'Exactly',
			Type: ComparisonOperator.EXACTLY,
			Label: 'Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EXACTLY,
		{
			Display: 'Not Exactly',
			Type: ComparisonOperator.NOT_EXACTLY,
			Label: 'Not Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.BEFORE,
		{
			Display: 'Before',
			Type: ComparisonOperator.BEFORE,
			Label: 'Before',
			Disable: false
		}
	],
	[
		ComparisonOperator.AFTER,
		{
			Display: 'After',
			Type: ComparisonOperator.AFTER,
			Label: 'After',
			Disable: false
		}
	],
	[
		ComparisonOperator.COMPARE_TODAY,
		{
			Display: 'Compare to Today',
			Type: ComparisonOperator.COMPARE_TODAY,
			Label: 'Compare to Today',
			Disable: true
		}
	]
])

export const TEXT_CONDITION: ReadonlyMap<ComparisonOperator, IComparison> = new Map([
	[
		ComparisonOperator.EMPTY,
		{
			Display: 'Empty',
			Type: ComparisonOperator.EMPTY,
			Label: 'Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EMPTY,
		{
			Display: 'Not Empty',
			Type: ComparisonOperator.NOT_EMPTY,
			Label: 'Not Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.EXACTLY,
		{
			Display: 'Exactly',
			Type: ComparisonOperator.EXACTLY,
			Label: 'Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EXACTLY,
		{
			Display: 'Not Exactly',
			Type: ComparisonOperator.NOT_EXACTLY,
			Label: 'Not Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.CONTAINS,
		{
			Display: 'Contains',
			Type: ComparisonOperator.CONTAINS,
			Label: 'Contains',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_CONTAINS,
		{
			Display: 'Does Not Contain',
			Type: ComparisonOperator.NOT_CONTAINS,
			Label: 'Does Not Contain',
			Disable: false
		}
	],
	[
		ComparisonOperator.STARTS_WITH,
		{
			Display: 'Starts With',
			Type: ComparisonOperator.STARTS_WITH,
			Label: 'Starts With',
			Disable: false
		}
	],
	[
		ComparisonOperator.ENDS_WITH,
		{
			Display: 'Ends With',
			Type: ComparisonOperator.ENDS_WITH,
			Label: 'Ends With',
			Disable: false
		}
	]
])

export const BOOLEAN_CONDITION: ReadonlyMap<ComparisonOperator, IComparison> = new Map([
	[
		ComparisonOperator.EQUAL,
		{
			Display: '=',
			Type: ComparisonOperator.EQUAL,
			Label: 'Equal',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EQUAL,
		{
			Display: '≠',
			Type: ComparisonOperator.NOT_EQUAL,
			Label: 'Not Equal',
			Disable: false
		}
	]
])

export const SELECT_CONDITION: ReadonlyMap<ComparisonOperator, IComparison> = new Map([
	[
		ComparisonOperator.EMPTY,
		{
			Display: 'Empty',
			Type: ComparisonOperator.EMPTY,
			Label: 'Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EMPTY,
		{
			Display: 'Not Empty',
			Type: ComparisonOperator.NOT_EMPTY,
			Label: 'Not Empty',
			Disable: false
		}
	],
	[
		ComparisonOperator.EXACTLY,
		{
			Display: 'Exactly',
			Type: ComparisonOperator.EXACTLY,
			Label: 'Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_EXACTLY,
		{
			Display: 'Not Exactly',
			Type: ComparisonOperator.NOT_EXACTLY,
			Label: 'Not Exactly',
			Disable: false
		}
	],
	[
		ComparisonOperator.IN,
		{
			Display: 'In',
			Type: ComparisonOperator.IN,
			Label: 'In',
			Disable: false
		}
	],
	[
		ComparisonOperator.NOT_IN,
		{
			Display: 'Not In',
			Type: ComparisonOperator.NOT_IN,
			Label: 'Not In',
			Disable: false
		}
	]
])
