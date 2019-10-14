import { DraftAlert, ToDoAlert } from "$alerts"
import { Tabs } from "$components/Tabs"

<DraftAlert />

# Руководство разработчика

В мире примитивных примеров, который нас окружает, разработчику очень сложно эффективно учиться, расти и создавать качественные продукты. Зачастую, мы не выстраиваем приложение вокруг целостного скелета, а собираем мозаику из множества разбросанных по Интернету кусочков.

В данном руководстве мы хотим использовать такое комплексное приложение как [SDE Team Server](/ru/apps/team-server) в качестве образца, который предоставит подобный фундамент. Рассмотрев не только его код как факт, а пройдя шаг за шагом через всю историю создания этого инженерного продукта с самых первых робких шагов.

## Спецификация

### Пример

В науке существует два метода исследования - описательный и аналитический. Первый употребляется наиболее широко и не требует строгой формализации, что делает его лего доступным для использования практически с любым заказчиком.

Одним из базовых компонент этого метода являются примеры. Это то, с чего анализ предметной области легче всего начинать. SDE Team Server в первую очередь предполагает коммуникации между разработчиками и заказчиками в рамках некоторого проекта. И скорее всего обсуждение с них и начнётся.

<Tabs>
    <Tab caption="Typescript">
        <pre>
    {`const alice = {
    firstName: "Alice",
    role: "developer"
}\n
const bob = {
    firstName: "Bob",
    role: "stakeholder"
}\n
const teamServer = {
    name: "SDE Team Server"
}`}
        </pre>
    </Tab>
    <Tab caption="Rust">
        
    </Tab>
    <Tab caption="F#">
        
    </Tab>
</Tabs>

В данном случае не важно, насколько полными будут примеры. Их задача - эволюционировать.

<ToDoAlert>Привести пример из фильма "Тренер Картер"</ToDoAlert>

### Predicate

<ToDoAlert>Subject act(ion) object. Action = predicate.</ToDoAlert>

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
