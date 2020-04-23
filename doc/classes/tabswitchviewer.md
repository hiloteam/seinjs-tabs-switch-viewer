[seinjs-tabs-switch-viewer](../README.md) › [Globals](../globals.md) › [TabSwitchViewer](tabswitchviewer.md)

# Class: TabSwitchViewer

切换管理器。

## Hierarchy

* **TabSwitchViewer**

## Index

### Properties

* [_currentTab](tabswitchviewer.md#private-_currenttab)
* [_game](tabswitchviewer.md#private-_game)
* [_started](tabswitchviewer.md#private-_started)

### Accessors

* [game](tabswitchviewer.md#game)

### Methods

* [destroy](tabswitchviewer.md#destroy)
* [init](tabswitchviewer.md#init)
* [pause](tabswitchviewer.md#pause)
* [resume](tabswitchviewer.md#resume)
* [start](tabswitchviewer.md#start)
* [switchTab](tabswitchviewer.md#switchtab)

## Properties

### `Private` _currentTab

• **_currentTab**: *string* = null

Defined in src/index.ts:22

___

### `Private` _game

• **_game**: *Game‹GameState›*

Defined in src/index.ts:20

___

### `Private` _started

• **_started**: *boolean* = false

Defined in src/index.ts:21

## Accessors

###  game

• **get game**(): *Game‹GameState‹››*

Defined in src/index.ts:24

**Returns:** *Game‹GameState‹››*

## Methods

###  destroy

▸ **destroy**(): *void*

Defined in src/index.ts:130

退出时记得销毁。

**Returns:** *void*

___

###  init

▸ **init**(`options`: [IOptions](../interfaces/ioptions.md), `beforeGameStart`: function): *Promise‹unknown›*

Defined in src/index.ts:34

通过参数初始化。

**Parameters:**

▪ **options**: *[IOptions](../interfaces/ioptions.md)*

初始化参数。

▪`Default value`  **beforeGameStart**: *function*= () => {}

在游戏实际执行前的回调，你可以做一些事情。

▸ (`game`: Game‹GameState›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`game` | Game‹GameState› |

**Returns:** *Promise‹unknown›*

___

###  pause

▸ **pause**(): *void*

Defined in src/index.ts:116

页面暂停时调用。

**Returns:** *void*

___

###  resume

▸ **resume**(): *void*

Defined in src/index.ts:123

页面唤醒时调用。

**Returns:** *void*

___

###  start

▸ **start**(`tab`: string): *Promise‹unknown›*

Defined in src/index.ts:73

以`tab`作为第一个展示的场景开始。

**Parameters:**

Name | Type |
------ | ------ |
`tab` | string |

**Returns:** *Promise‹unknown›*

___

###  switchTab

▸ **switchTab**(`tab`: string, `onStart?`: function): *Promise‹unknown›*

Defined in src/index.ts:92

切换到某一个Tab。

**Parameters:**

▪ **tab**: *string*

要切换到的Tab。

▪`Optional`  **onStart**: *function*

在切换前调用。

▸ (`direction`: "pre" | "next"): *void*

**Parameters:**

Name | Type |
------ | ------ |
`direction` | "pre" &#124; "next" |

**Returns:** *Promise‹unknown›*
