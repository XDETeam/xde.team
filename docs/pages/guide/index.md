import { DraftAlert, TranslateAlert } from "\$alerts";

<DraftAlert />

# SDE TypeScript Development Guide

<TranslateAlert href="/ru/guide" version="Russian" />

We will use a development of the SDE Team Server (collaboration tool) as a
sample of the application being development through this guide. So let's design
it from the scratch.

## Changes

TODO:Agility, Volatility (I dislike flexibility and scalability).

The only thing that stays unchanged in the development process is that everything
will be changed. Something sooner, another later. Nothing will stay the same
forever.

And application we are developing today may become completely different next
year. So the most foreseeing approach is to create environment, platform for
changes.

This guide will be also a sequence of small steps from a very primitive solutions
to the most useful ones. This is how it evolves.

## Specification

### Specification language

This is a primary language we will use to write applications. It is crafted for
the particular project and thus it is the best choice for it.

This language will be used everywhere. We will translate it into TypeScript,
SQL, web and mobile forms and use to communicate with stakeholders, teammates
and consumers.

Software designers appreciate abstraction and that's it compared to programming
languages. Last ones a numerous, subject of changes (see [Changes](#changes)),
not good to communicate with non-technical people. So if this virtual designer
will look into this ecosystem, it should definitely decide that such abstract
language should be defined.

Specification language is close to ubiquitous language in DDD and domain-specific
languages (DSLs).

### Sample

Sample is one of the basic implementations of nouns in the language and is what
we usually start with. Before information from stakeholders will be analysed and
inductively formalized by experts is exists in this simple form and we can get a
lot of benefits from it, because samples are always a helpful tool for
communication.

TODO:Include samples from "Coach Carter" film.

To move the application on let's introduce some basic samples.

```typescript
const alice = {
	firstName: "Alice",
	role: "developer"
};

const bob = {
	firstName: "Bob",
	role: "stakeholder"
};

const teamServer = {
	name: "SDE Team Server"
};
```

### Predicate

TODO: Subject act(ion) object. Action = predicate.

### Sentence

Specification is a set of "sentences" in the specification language and briefly
consists of noun and verbs.

TODO:Sentence = case
TODO:Set of sentences (GWT) = Feature/Chapter.

TODO:

```
when<SignIn>(intruder);
then<Error>(permissionDenied);
```
