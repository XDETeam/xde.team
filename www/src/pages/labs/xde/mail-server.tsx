import React from "react";

import { Layout } from "../../../templates/layout";

export const MailServer = (props) => {
	return (
		<Layout>
			<header>
				<h1>Mail server</h1>
			</header>

			<section>
				<h2>Инструменты</h2>
				<ul>
					<li>
						<a href="https://github.com/mailcow/mailcow-dockerized">
							mailcow-dockerized
						</a>
					</li>
					<li>
						<a href="https://github.com/yavulan/mailcow-ansiblerole">
							mailcow-ansiblerole
						</a>{" "}
						<small>
							TODO: Дополнительно добавить docker-compose.override (для связки с{" "}
							<var>traefik</var> на одном сервере); установить нужные значения
							переменных; установить дополнительные pip модули на контроллер
						</small>
					</li>
				</ul>
			</section>
			<section>
				<h2>Настройка</h2>
				<p>
					Выбираем основной почтовый домен (<var>main.zone</var>). Остальные почтовые
					домены на этом же IP будут ссылаться на него.
				</p>
				<p>DNS записи для домена:</p>
				<table>
					<thead>
						<tr>
							<th>name/host</th>
							<th>type</th>
							<th>value</th>
							<th>explanation</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={4}>
								<strong>Main</strong>
							</td>
						</tr>
						<tr>
							<td>@</td>
							<td>MX</td>
							<td>mail.main.zone | 10</td>
							<td></td>
						</tr>
						<tr>
							<td>mail</td>
							<td>A</td>
							<td>1.2.3.4</td>
							<td></td>
						</tr>
						<tr>
							<td>mail</td>
							<td>AAAA</td>
							<td>...0000:0000:0001</td>
							<td>
								<a href="https://dnschecker.org/ipv6-expand.php">expanded</a>{" "}
								<var>IPv6::1</var>
								<details>
									<summary>mailcow</summary>
									Mail setup &rarr; ?DNS (возле домена)
								</details>
							</td>
						</tr>
						<tr>
							<td colSpan={4}>
								<strong>Antispam</strong>
							</td>
						</tr>
						<tr>
							<td>_dmarc</td>
							<td>TXT</td>
							<td>v=DMARC1; p=reject; rua=mailto:mailauth-reports@main.zone</td>
							<td>
								<a href="https://www.kitterman.com/dmarc/assistant.html">
									DMARC Assistant
								</a>{" "}
								(
								<a href="https://dmarcian.com/dmarc-inspector/?domain=google.com">
									check
								</a>
								)
							</td>
						</tr>
						<tr>
							<td>@</td>
							<td>TXT</td>
							<td>v=spf1 mx a -all</td>
							<td>
								Only allow <var>this server</var> (the MX) to send mail for your
								domain. <a href="http://www.open-spf.org/">SPF Project</a> (
								<a href="https://dmarcly.com/tools/spf-record-checker">check</a>)
							</td>
						</tr>
						<tr>
							<td>dkim._domainkey</td>
							<td>TXT</td>
							<td>v=DKIM1; k=rsa; t=s; s=email; p=...</td>
							<td>
								<a href="http://www.opendkim.org/">OpenDKIM</a>.
								<details>
									<summary>mailcow</summary>
									Configuration &rarr; ARC/DKIM keys
								</details>
							</td>
						</tr>
						<tr>
							<td colSpan={4}>
								<strong>Discover</strong>
							</td>
						</tr>
						<tr>
							<td>autoconfig</td>
							<td>CNAME</td>
							<td>mail.main.zone</td>
							<td></td>
						</tr>
						<tr>
							<td>autodiscover</td>
							<td>CNAME</td>
							<td>mail.main.zone</td>
							<td></td>
						</tr>

						<tr>
							<td>_autodiscover._tcp</td>
							<td>SRV</td>
							<td>0 5 443 mail.main.zone</td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<h3>Дополнительные почтовые домены</h3>
				<p>
					Не забываем сгенерировать DCIM для нового домена (<var>additional.zone</var>) в
					админке mailcow.
				</p>
				<p>DNS записи для домена:</p>
				<table>
					<thead>
						<tr>
							<th>name/host</th>
							<th>type</th>
							<th>value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={3}>
								<strong>Main</strong>
							</td>
						</tr>
						<tr>
							<td>@</td>
							<td>MX</td>
							<td>mail.main.zone | 10</td>
						</tr>
						<tr>
							<td colSpan={3}>
								<strong>Antispam</strong>
							</td>
						</tr>
						<tr>
							<td>_dmarc</td>
							<td>TXT</td>
							<td>v=DMARC1; p=reject; rua=mailto:mailauth-reports@additional.zone</td>
						</tr>
						<tr>
							<td>@</td>
							<td>TXT</td>
							<td>v=spf1 mx a -all</td>
						</tr>
						<tr>
							<td>dkim._domainkey</td>
							<td>TXT</td>
							<td>v=DKIM1; k=rsa; t=s; s=email; p=...</td>
						</tr>
						<tr>
							<td colSpan={3}>
								<strong>Discover</strong>
							</td>
						</tr>
						<tr>
							<td>autoconfig</td>
							<td>CNAME</td>
							<td>mail.main.zone</td>
						</tr>
						<tr>
							<td>autodiscover</td>
							<td>CNAME</td>
							<td>mail.main.zone</td>
						</tr>

						<tr>
							<td>_autodiscover._tcp</td>
							<td>SRV</td>
							<td>0 5 443 mail.main.zone</td>
						</tr>
					</tbody>
				</table>
				<h2>Не попасть в спам</h2>
				<ul>
					<li>
						У почты меньше шансов попасть в спам, если используются DKIM, DMARK, SPF.
					</li>
					<li>
						Setup reverse DNS entry for <var>IPv6::1</var> pointing to{" "}
						<var>mail.main.zone</var>.
						<details>
							<summary>hetzner</summary>
							Сервер &rarr; networking &rarr; Primary IPs &rarr; Edit Reverse DNS
							&rarr; добавляем <var>::1</var> и Reverse DNS <var>mail.main.zone</var>.{" "}
							<small>
								Кстати, цифру, нужную вместо <var>1</var>, можно взять из DNS записи
								вида
								<var>
									1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa PTR mail.domain.zone
								</var>{" "}
								в админке mailcow
							</small>
						</details>
					</li>
					<li>TODO:</li>
				</ul>
				<h2>Тестирование</h2>
				<ul>
					<li>
						Проверить почту на open relay и другие проблемы -{" "}
						<a href="https://mxtoolbox.com/diagnostic.aspx">mxtoolbox.com</a>
					</li>
					<li>
						<p>
							Убедиться, что <var>SPF: PASS</var>, <var>DKIM: 'PASS'</var>,{" "}
							<var>DMARC: 'PASS'</var>, отправив себе письмо и глянув его оригинал.
						</p>
						<p>
							Заодно можно глянуть <var>security</var> (в gmail - открыв письмо и
							нажав на стрелочку вниз возле текста <var>to me</var>) и убедиться, что
							там что-то похожее на наличие TLS (к примеру, Standard encryption
							(TLS)).
						</p>
						<p>
							Еще инструкции можно найти <a href="https://www.appmaildev.com/">тут</a>
							, так же можно получить отчет, отправив им письмо.
						</p>
					</li>
				</ul>
			</section>
		</Layout>
	);
};

export default MailServer;
