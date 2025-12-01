import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-navy to-navy-dark text-white mt-12">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-baby-blue mb-2">TaskFlow</h3>
            <p className="text-baby-blue-light text-sm">
              Organize suas tarefas com eficiência e aumente sua produtividade
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-baby-blue mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-baby-blue-light hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="text-baby-blue-light hover:text-white transition-colors">
                  Tarefas
                </Link>
              </li>
              <li>
                <Link href="/kanban" className="text-baby-blue-light hover:text-white transition-colors">
                  Kanban
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-baby-blue-light hover:text-white transition-colors">
                  Calendário
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-baby-blue mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#privacy" className="text-baby-blue-light hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-baby-blue-light hover:text-white transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="#cookies" className="text-baby-blue-light hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-baby-blue mb-4">Contato</h4>
            <div className="flex gap-4">
              <a
                href="mailto:support@taskflow.com"
                className="p-2 bg-baby-blue text-navy rounded-lg hover:bg-baby-blue-light transition-colors"
                title="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-baby-blue text-navy rounded-lg hover:bg-baby-blue-light transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-baby-blue text-navy rounded-lg hover:bg-baby-blue-light transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-light my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-baby-blue-light text-sm">
            &copy; {currentYear} TaskFlow. Todos os direitos reservados.
          </p>
          <p className="text-baby-blue-light text-sm mt-4 md:mt-0">
            Desenvolvido com ❤️ usando Next.js e Firebase
          </p>
        </div>
      </div>
    </footer>
  );
}

