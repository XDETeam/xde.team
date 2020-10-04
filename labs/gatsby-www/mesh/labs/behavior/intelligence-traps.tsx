import React from "react";
import { Layout } from "../../../templates/layout";
import Quote from "../../../components/Quote";

export const IntelligenceTraps = () => (
	<Layout>
		<header>
			<h1>Intelligence traps</h1>
		</header>
		<section>
			<h2>Вступление</h2>
			<p>
				Что определяет нас? Набор программ трансформаций сигналов, попадающих на наши
				рецепторы.
			</p>
			<p>
				Одно из наших преимуществ (предположительно) над другими видами - возможность
				метапрограммирования своих программ.
			</p>
			<p>TODO: примеры и вынести на отдельную страницу</p>
		</section>
		<section>
			<h2>Проблема</h2>
			<p>
				Представим, что мы хотим что-то сделать. Как поведет себя человек с низким
				интеллектом - с большой вероятностью, непродуманно попробует это сделать. И, при
				достаточной сложности желания, у него не получится с первого раза. Но при низкой
				цене ошибки, достаточном терпении и хоть малейшем изменением тактики от попытки к
				попытке - человек с низким интеллектом неизбежно преуспеет.
			</p>
			<p>
				Теперь поспекулирем по поводу человека с "высоким" интеллектом. Скорее всего, он не
				начнет необдуманно бросаться в бой. Захочет все спланировать. Будет искать как можно
				больше нужной информации, анализировать, моделировать. Его будет бросать в
				различного рода размышления. Он найдет много примеров, где люди пробовали и у них
				ничего не получилось. Это понизит его желание сделать именно это. Начнет искать,
				дополнительную мотивацию, анализировать поведение тех, кому удалось, сомневаться...
				И это может длиться крайне долго. Возможно, через длительное количество времени
				(когда может уже стать поздно) - все же сделает попытку. И, с достаточно большой
				вероятностью, у него не получится. К примеру, просто из-за отсутствия практики
				(иногда даже зная, как сделать - не всегда получается с первого раза). И тут все
				заново - глубокий анализ и продолжительное отсутствие действий.
			</p>
			<p>А к этому времени человек с более низким интеллектом уже добьется своего.</p>
			<p>
				<em>
					Прим.: Это справедливо только для некоторого типа целей, но их достаточно много
					в нашей жизни.
				</em>
			</p>

			<details>
				<summary>Marrying choice</summary>
				<Quote
					author="Gerd Gigerenzer"
					uri="https://www.lesswrong.com/posts/z9hfbWhRrY2Pwwrgi/summary-of-the-straw-vulcan"
				>
					He would have to look at the probabilities of various consequences of marrying
					each of them—whether the woman would still talk to him after they’re married,
					whether she’d take care of their children, whatever is important to him—and the
					utilities of each of these… After many years of research he’d probably find out
					that his final choice had already married another person who didn’t do these
					computations, and actually just fell in love with her.
				</Quote>
			</details>

			<details>
				<summary>Еще подтверждение (удалить?)</summary>
				Basically, sometimes there are good cultural practises that smart people fail to see
				the logic behind (because it's subtle, or because it's inconsistent with some false
				belief they have), and so they drop the practise, to their detriment. Less smart
				people keep doing it, since they're happy to simply conform without having reasons
				for everything.
			</details>
		</section>

		<section>
			<h2>Ближе к сути</h2>
			<p>
				Приведем еще пример. В этот раз с низким интеллектом и программой самосохранения
				(прим - ссылка на программу самосохранения, где указывается, что она одна из базовых
				и очень сложно ее перезаписать, но очень легко "обмануть"). Работник опасного
				производства несколько раз проигнорировал технику безопасности и ничего плохого не
				случилось. Он сделал самоуверенный вывод, что ему ничего не угрожает, и можно не
				следовать правилам техники безопасности. В таком случае мы не можем сказать, что у
				него не работает программа самосохранения, до момента анализа программой
				самосохранения даже не доходит, т.к. мозг считает, что опасности нет в принципе. Но
				работник запросто может погибнуть.
			</p>
			<p>
				Проблема высокого интеллекта из той же оперы.{" "}
				<strong>Интеллект открывает возможности виртуозно заниматься самообманом</strong>,
				находить оправдания невыгодным себе действиям (их отсутствию), незаметно для себя
				задействовать те программы, проявления которых желаешь избавиться (
				<em>
					к примеру, программу прокрастинации - как часто занимаемся овер-планированием
					вместо действий
				</em>
				).
			</p>

			<details>
				<summary>Со стороны виднее</summary>
				Именно поэтому легче советовать другим, чем себе. Упражнение - представлять ситуацию
				со стороны, обезличено и думать, что бы посоветовал.
			</details>
		</section>

		<section>
			<h2>Типичные примеры</h2>

			<details>
				<summary>Гордыня</summary>
				Именно поэтому гордыня - грех (отсутствие гордыни дает возможность взглянуть на себя
				критически).
				<p>Ценить интеллект выше других качеств - ошибка.</p>
				<p>Переоценивание "быть правым".</p>
			</details>

			<details>
				<summary>Овер-планирование</summary>
				<p>Создает иллюзию продвижения к цели, но, на самом деле - форма прокрастинации.</p>
				<p>
					Пример Стаса, где он обсуждал со знакомым, что проще было уже реализовать 2
					варианта, и посмотреть, чем разводить холивары.
				</p>
				<p>Больше сомнений - меньше результата.</p>
			</details>

			<details>
				<summary>Желание сразу сделать идеально, желание не ошибаться</summary>
				TODO: seek failrues (test boundaries), fail early (mvp)
			</details>

			<details>
				<summary>Refusing to choose</summary>
				<p>
					Refusing to choose is also a choice. The null plan is still a plan. We always do
					something, even if it's nothing. As Russell and Norvig put it, "Refusing to
					choose is like refusing to allow time to pass." Refusing to choose is often one
					of the worst choices you can make.
				</p>
				<p>
					Ждать всей информации (когда это неэффективно) - форма самообмана, которая
					помогает убедить себя повременить.
				</p>
			</details>

			<details>
				<summary>Expecting other people to always be rational</summary>
				TODO
			</details>

			<details>
				<summary>Пытаться все измерить</summary>
				Пока инструментов измерить все нет - как измерить общее ощущение, красоту, любовь,
				радость? При каких-либо оценках цепляться исключительно к измеряемым показателям -
				ошибка.
			</details>
		</section>
	</Layout>
);

export default IntelligenceTraps;
