#include <iostream>
#include <string>
#include <thread>
#include <chrono>

// Helper function for seconds (used for countdown)
void delay(int seconds) {
    std::this_thread::sleep_for(std::chrono::seconds(seconds));
}

// Helper function for slow-motion line printing (in milliseconds)
void printLine(const std::string &text, int milliseconds = 200) {
    std::cout << text << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(milliseconds));
}

int main() {
    std::string loverName;
    char confirm;

    // Introduction Header
    printLine("==========================================", 150);
    printLine("      THE TERMINAL OF LOVE & ROMANCE      ", 150);
    printLine("==========================================", 400);
    std::cout << "\n";

    // Input Name
    std::cout << "Enter the name of the special person you love: ";
    std::getline(std::cin, loverName);

    std::cout << "You entered [" << loverName << "]. Is this correct? (y/n): ";
    std::cin >> confirm;

    // Check confirmation
    if (confirm != 'y' && confirm != 'Y') {
        std::cout << "\nThat's okay! Restart the program when you're ready to declare your love.\n";
        return 0;
    }

    std::cout << "\n";
    printLine("Locking in the coordinates of the heart...", 800);
    printLine("Gathering all my love, roses, and sweet memories for " + loverName + "...", 1000);

    // 5-Second Suspense Countdown
    printLine("\nPrepare yourself. Magic is loading in:", 500);
    for (int i = 5; i > 0; --i) {
        std::cout << " >>> " << i << " <<< " << std::endl;
        delay(1);
    }

    // BOOM! Slow-Motion Reveal
    std::cout << "\n\n";
    printLine("        *     ,     *     .     *     .   ", 300);
    printLine("    .      *        BOOM!      .     *      ", 300);
    printLine("      *   .     ❤️  ❤️  ❤️   .     *         \n", 600);

    // Slow-Motion ASCII Heart Art Reveal
    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    // Slow-Motion Flower Garden Reveal
    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);

    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);

    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);


    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);

    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);


    printLine("        ♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥        ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥     ", 150);
    printLine("      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥      ", 150);
    printLine("        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥        ", 150);
    printLine("          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥          ", 150);
    printLine("            ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥            ", 150);
    printLine("              ♥♥♥♥♥♥♥♥♥♥♥♥              ", 150);
    printLine("                ♥♥♥♥♥♥♥♥                ", 150);
    printLine("                  ♥♥♥♥                  ", 150);
    printLine("                   ♥♥                   \n", 500);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);

    printLine("     🌸    🌹    🌷    🌻    🌺    🌼     ", 200);
    printLine("    \\^/   \\^/   \\^/   \\^/   \\^/   \\^/    ", 200);
    printLine("     |     |     |     |     |     |     ", 200);
    printLine("    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\n", 600);



    // Slow-Motion Romantic Message
    printLine("==================================================", 200);
    printLine("            TO MY DEAREST " + loverName + "         ", 250);
    printLine("==================================================", 250);
    printLine("SHE IS VERYYYYY PRETTYYYYY, LIKE VERY PRETTY ", 250);
    
    printLine("Oui, Je t'aime !.\n", 300);
    
    printLine("Every single moment spent thinking of your smile", 250);
    printLine("you brighten my world more than a thousand suns.", 250);
    printLine("Please , smile right now ! ", 250);
    printLine("Yes, I love you ! " + loverName + ".\n", 300);

    printLine("I love you deeper than words or logic can express.", 250);
    printLine(" ❤️❤️❤️❤️M❤️I❤️S❤️S❤️W❤️E❤️L❤️L❤️❤️❤️❤️", 250);
    printLine("==================================================", 100);

    return 0;
}
