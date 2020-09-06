import React from "react";

import { Layout } from "../../../templates/layout";

export const Infrastructure = (props) => {
	return (
		<Layout>
			<header>
				<h1>Infrastructure</h1>
			</header>

			<section>
				<h2>Почта</h2>
				<p>
					https://github.com/mailcow/mailcow-dockerized +
					https://github.com/yavulan/mailcow-ansiblerole + docker-compose.override to
					allow traefik cert managing
				</p>
				<p>
					1. Выбираем основной почтовый домен. Все остальные почтовые домены (на этом же
					IP) будут ссылаться на него же. 2. DNS записи для домена: | name/host | type |
					value | explanation | | -------------------- | ----- |
					----------------------------------------------------------- |
					------------------------------------------------------------------------------------------------------------------------------------
					| | \_dmarc | TXT | v=DMARC1; p=reject; rua=mailto:mailauth-reports@domain.zone
					| [DMARC Assistant](https://www.kitterman.com/dmarc/assistant.html)
					([check](https://dmarcian.com/dmarc-inspector/?domain=google.com)) | | @ | TXT |
					v=spf1 mx a -all | only allow THIS server (the MX) to send mail for your domain.
					[SPF Project](http://www.open-spf.org/) | | dkim.\_domainkey | TXT | v=DKIM1;
					k=rsa; t=s; s=email; p=... | [OpenDKIM](http://www.opendkim.org/). Генерируется
					в админке mailcow (configuration -> ARC/DKIM keys). | | mail | A | 1.2.3.4 | | |
					@ | MX | mail.domain.zone \| 10 | | | autoconfig | CNAME | mail.domain.zone | |
					| autodiscover | CNAME | mail.domain.zone | | | mail | AAAA | ...0000:0000:0001
					| Значение подскажет админка mailcow (mail setup -> ?DNS возле домена). | |
					\_autodiscover.\_tcp | SRV | 0 5 443 mail.domain.zone | | 3. В hetzner заходим
					на сервер, жмем networking, в разделе Primary IPs изменяем IPv6 - добавляем ему
					`::1` и значение `mail.domain.zone`. Если вдруг что не работает - смотрим в
					админке mailcow DNS для домена, первую цифру в записи вида:
					`1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa PTR mail.domain.zone` и ставим эту
					первую цифру вместо 1. 4. Настраиваем дополнительные домены. 1. В админке
					mailcow генерируем DCIM для нового домена. 2. DNS | name/host | type | value |
					explanation | | -------------------- | ----- |
					----------------------------------------------------------- |
					------------------------------------------------------------------------------------------------------------------------------------
					| | \_dmarc | TXT | v=DMARC1; p=reject; rua=mailto:mailauth-reports@domain.zone
					| [DMARC Assistant](https://www.kitterman.com/dmarc/assistant.html)
					([check](https://dmarcian.com/dmarc-inspector/?domain=google.com)) | | @ | TXT |
					v=spf1 mx a -all | only allow THIS server (the MX) to send mail for your domain.
					[SPF Project](http://www.open-spf.org/) | | dkim.\_domainkey | TXT | v=DKIM1;
					k=rsa; t=s; s=email; p=... | [OpenDKIM](http://www.opendkim.org/). Генерируется
					в админке mailcow (configuration -> ARC/DKIM keys). | | @ | MX |
					mail.FIRST_domain.zone \| 10 | | | autoconfig | CNAME | mail.FIRST_domain.zone |
					| | autodiscover | CNAME | mail.FIRST_domain.zone | | | \_autodiscover.\_tcp |
					SRV | 0 5 443 mail.FIRST_domain.zone | |
					<ul>
						<li> https://dmarcly.com/tools/spf-record-checker</li>
						<li>
							Проверить почту на open relay https://mxtoolbox.com/diagnostic.aspx{" "}
						</li>
						<li>https://www.appmaildev.com/</li>
						<li>https://mxtoolbox.com/diagnostic.aspx en/dkim </li>
					</ul>
					<p>У почты больше шансов попасть в спам, пока не настроено DKIM, DMARK, SPF.</p>
				</p>
			</section>
		</Layout>
	);
};

export default Infrastructure;
