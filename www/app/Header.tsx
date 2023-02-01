import { Container } from "@/components/Container";
import MainMenu from "./MainMenu";

export const Header = () => (
    <header>
 		<Container className="bg-red-600 p-4 text-white rounded-lg mt-2">
 			Сайт находится в разработке. Возможны ошибки и неточности...
 		</Container>

 		<nav>
 			<Container className="relative z-50 flex justify-between py-8">
 				<div className="relative z-10 flex items-center gap-16">
 					<div className="hidden lg:flex lg:gap-10">
                        <MainMenu />
 					</div>
 				</div>
 			</Container>
 		</nav>
    </header>
)

export default Header;
