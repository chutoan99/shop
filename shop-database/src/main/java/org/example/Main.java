package org.example;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter migration description (use underscores for spaces): ");
        String description = scanner.nextLine().trim();

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));

        String fileName = "V" + timestamp + "__" + description + ".sql";

        String migrationsDir = "./src/main/resources/db/migrations";
        File dir = new File(migrationsDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Tạo file mới
        File migrationFile = new File(dir, fileName);
        try (FileWriter writer = new FileWriter(migrationFile)) {
            writer.write("-- Write your SQL migration here\n");
            System.out.println("✅ Migration file created: " + migrationFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        scanner.close();
    }
}