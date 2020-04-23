[seinjs-tabs-switch-viewer](../README.md) › [Globals](../globals.md) › [Bazier](bazier.md)

# Class: Bazier

贝塞尔曲线插值器生成。

## Hierarchy

* **Bazier**

## Index

### Constructors

* [constructor](bazier.md#constructor)

### Properties

* [ys](bazier.md#private-ys)

### Methods

* [eval](bazier.md#eval)

## Constructors

###  constructor

\+ **new Bazier**(`p2`: number[], `p3`: number[], `step`: number): *[Bazier](bazier.md)*

Defined in src/Bazier.ts:35

构造函数。

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`p2` | number[] | - | 控制点1 |
`p3` | number[] | - | 控制点2 |
`step` | number | 0.01 | 单步步长  |

**Returns:** *[Bazier](bazier.md)*

## Properties

### `Private` ys

• **ys**: *number[]* = []

Defined in src/Bazier.ts:35

## Methods

###  eval

▸ **eval**(`t`: number): *number*

Defined in src/Bazier.ts:67

求值方法。

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t` | number | 进度, 0 ~ 1  |

**Returns:** *number*
