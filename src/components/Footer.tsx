export function Footer() {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-800">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/privacy-policy" className="text-gray-800 hover:text-red-600">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-800 hover:text-red-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
