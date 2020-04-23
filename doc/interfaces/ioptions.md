[seinjs-tabs-switch-viewer](../README.md) › [Globals](../globals.md) › [IOptions](ioptions.md)

# Interface: IOptions

TabSwitchViewer的配置。

## Hierarchy

* **IOptions**

## Index

### Properties

* [canvas](ioptions.md#canvas)
* [enter](ioptions.md#optional-enter)
* [forceCompressTexture](ioptions.md#optional-forcecompresstexture)
* [gltf](ioptions.md#gltf)
* [intervalPerCreating](ioptions.md#optional-intervalpercreating)
* [leave](ioptions.md#optional-leave)
* [lockFrame](ioptions.md#optional-lockframe)
* [mars](ioptions.md#optional-mars)
* [nextRotation](ioptions.md#optional-nextrotation)
* [preRotation](ioptions.md#optional-prerotation)
* [startAlpha](ioptions.md#optional-startalpha)
* [tabList](ioptions.md#tablist)
* [useGyroscope](ioptions.md#optional-usegyroscope)

## Properties

###  canvas

• **canvas**: *HTMLCanvasElement*

Defined in src/GameState.ts:32

Canvas。

___

### `Optional` enter

• **enter**? : *[IAnimationOptions](ianimationoptions.md)*

Defined in src/GameState.ts:86

场景模型入场配置。

___

### `Optional` forceCompressTexture

• **forceCompressTexture**? : *boolean*

Defined in src/GameState.ts:70

不支持压缩纹理的情况下，是否强制失败。

**`default`** false

___

###  gltf

• **gltf**: *string*

Defined in src/GameState.ts:36

gltf文件地址，一般通过`seinjs-gltf-loader`引入。

___

### `Optional` intervalPerCreating

• **intervalPerCreating**? : *number*

Defined in src/GameState.ts:64

每个模型初始化之间的间隔，一个优化，毫秒。

**`default`** 200

___

### `Optional` leave

• **leave**? : *[IAnimationOptions](ianimationoptions.md)*

Defined in src/GameState.ts:90

场景模型出场配置。

___

### `Optional` lockFrame

• **lockFrame**? : *boolean*

Defined in src/GameState.ts:46

是否强制锁30帧。

**`default`** false

___

### `Optional` mars

• **mars**? : *object*

Defined in src/GameState.ts:94

Mars配置。

#### Type declaration:

* **RUNTIME**? : *any*

* **bgName**? : *string*

* **nextTransName**? : *string*

* **preTransName**? : *string*

* **vfx**? : *string*

___

### `Optional` nextRotation

• **nextRotation**? : *Quaternion*

Defined in src/GameState.ts:82

向后切的角度四元数。

**`default`** 90度的四元数

___

### `Optional` preRotation

• **preRotation**? : *Quaternion*

Defined in src/GameState.ts:76

向前切的角度四元数。

**`default`** -90度的四元数

___

### `Optional` startAlpha

• **startAlpha**? : *number*

Defined in src/GameState.ts:52

预渲染时的透明度。

**`default`** 0.03

___

###  tabList

• **tabList**: *string[]*

Defined in src/GameState.ts:40

Tab列表，按顺序。

___

### `Optional` useGyroscope

• **useGyroscope**? : *boolean*

Defined in src/GameState.ts:58

是否使用陀螺仪。

**`default`** true
