// Missy.cpp
// A gift program for Missy — the explorer. (Auto-run; no input required.)
//
// The game UI shows the intro text below BEFORE this program runs:
//   "Remember when i told you i created this program for you,
//    yes and you wanted to see it in real life, wel here is the code,"
//
// The program then runs on its own and prints "Misswell" automatically.

#include <iostream>
#include <string>
#include <thread>
#include <chrono>

int main() {
    // Intro text already displayed by the game before this runs.

    // Typewriter reveal of her name.
    const std::string name = "Misswell";
    std::cout << "\n  --- Missy.cpp ---\n\n";
    std::cout << "  ";
    for (char c : name) {
        std::cout << c << std::flush;
        std::this_thread::sleep_for(std::chrono::milliseconds(150));
    }
    std::cout << "\n\n";

    // Her message (the gift itself).
    std::cout << "  The best gift is you, yourself, Missy.\n";
    std::cout << "  You brought the world back to life, and it is yours.\n\n";

    // A little sparkle so it feels like a gift, not a file.
    const std::string sparkles = "  **  **  **  **  **  **";
    for (int i = 0; i < 3; ++i) {
        std::cout << sparkles << "\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }

    std::cout << "\n  ( Program complete. )\n";
    return 0;
}
