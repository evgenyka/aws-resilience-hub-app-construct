# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AwsResilienceHubApp <a name="AwsResilienceHubApp" id="aws-resiliencehub-app.AwsResilienceHubApp"></a>

#### Initializers <a name="Initializers" id="aws-resiliencehub-app.AwsResilienceHubApp.Initializer"></a>

```typescript
import { AwsResilienceHubApp } from 'aws-resiliencehub-app'

new AwsResilienceHubApp(scope: Construct, id: string, props: AwsResilienceHubAppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.props">props</a></code> | <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps">AwsResilienceHubAppProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-resiliencehub-app.AwsResilienceHubApp.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-resiliencehub-app.AwsResilienceHubAppProps">AwsResilienceHubAppProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="aws-resiliencehub-app.AwsResilienceHubApp.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="aws-resiliencehub-app.AwsResilienceHubApp.isConstruct"></a>

```typescript
import { AwsResilienceHubApp } from 'aws-resiliencehub-app'

AwsResilienceHubApp.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="aws-resiliencehub-app.AwsResilienceHubApp.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.property.appArn">appArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.property.importStatus">importStatus</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubApp.property.publishedVersion">publishedVersion</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-resiliencehub-app.AwsResilienceHubApp.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `appArn`<sup>Required</sup> <a name="appArn" id="aws-resiliencehub-app.AwsResilienceHubApp.property.appArn"></a>

```typescript
public readonly appArn: string;
```

- *Type:* string

---

##### `importStatus`<sup>Required</sup> <a name="importStatus" id="aws-resiliencehub-app.AwsResilienceHubApp.property.importStatus"></a>

```typescript
public readonly importStatus: string;
```

- *Type:* string

---

##### `publishedVersion`<sup>Required</sup> <a name="publishedVersion" id="aws-resiliencehub-app.AwsResilienceHubApp.property.publishedVersion"></a>

```typescript
public readonly publishedVersion: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AwsResilienceHubAppProps <a name="AwsResilienceHubAppProps" id="aws-resiliencehub-app.AwsResilienceHubAppProps"></a>

#### Initializer <a name="Initializer" id="aws-resiliencehub-app.AwsResilienceHubAppProps.Initializer"></a>

```typescript
import { AwsResilienceHubAppProps } from 'aws-resiliencehub-app'

const awsResilienceHubAppProps: AwsResilienceHubAppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.appName">appName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.resiliencyPolicyArn">resiliencyPolicyArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.sourceStackName">sourceStackName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.appAssessmentSchedule">appAssessmentSchedule</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.appDescription">appDescription</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-resiliencehub-app.AwsResilienceHubAppProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `appName`<sup>Required</sup> <a name="appName" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.appName"></a>

```typescript
public readonly appName: string;
```

- *Type:* string

---

##### `resiliencyPolicyArn`<sup>Required</sup> <a name="resiliencyPolicyArn" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.resiliencyPolicyArn"></a>

```typescript
public readonly resiliencyPolicyArn: string;
```

- *Type:* string

---

##### `sourceStackName`<sup>Required</sup> <a name="sourceStackName" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.sourceStackName"></a>

```typescript
public readonly sourceStackName: string;
```

- *Type:* string

---

##### `appAssessmentSchedule`<sup>Optional</sup> <a name="appAssessmentSchedule" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.appAssessmentSchedule"></a>

```typescript
public readonly appAssessmentSchedule: string;
```

- *Type:* string

---

##### `appDescription`<sup>Optional</sup> <a name="appDescription" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.appDescription"></a>

```typescript
public readonly appDescription: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="aws-resiliencehub-app.AwsResilienceHubAppProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---



